import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SettingService } from '../../../../../service/setting/device/setting.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PopupComponent } from '../../../../../components/popup/popup.component';
import { environment } from '../../../../../../environments/environment';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl, FormGroup } from '@angular/forms';

export interface Drugdictionary {
  orderitemcode: string;
  orderitemTHname?: string;
  orderitemENname?: string;
  genericname?: string;
  unused?: string;
  barcode?: string;
  Strength?: string;
  dosageunitcode?: string;
  capacity?: string;
  capacity_unit?: string;
  orderunitcode?: string;
  description?: string;
  pregnancy?: string;
  edned?: string;
  drugaccountcode?: string;
  poison?: string;
  stdcode?: string;
  dosegeform?: string;
  displaycolour?: string;
  tabcolor?: string;
  TMTcode?: string;
  GFMIScode?: string;
  GPOcode?: string;
  Inventorycode?: any[];
  cost?: string;
  IPDprice?: string;
  OPDprice?: string;
  firmname?: string;
  rdu?: string;
  pharmaco?: string;
  subpharmaco?: string;
  packageratio?: string;
  packunit?: string;
  width?: string;
  weight?: string;
  length?: string;
  height?: string;
  dateupdate?: Date;
}
export interface DeviceSelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-drugdictionary',
  standalone: false,

  templateUrl: './drugdictionary.component.html',
  styleUrl: './drugdictionary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrugdictionaryComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'orderitemcode',
    'orderitemTHname',
    'orderitemENname',
    'genericname',
    'packageratio',
    'packunit',
    // 'unused',
    'barcode',
    'Strength',
    'dosageunitcode',
    // 'capacity',
    // 'capacity_unit',
    'orderunitcode',
    'description',
    'pregnancy',
    'edned',
    // 'drugaccountcode',
    'poison',
    // 'stdcode',
    'dosegeform',
    // 'displaycolour',
    // 'tabcolor',
    'TMTcode',
    // 'GFMIScode',
    // 'GPOcode',
    'cost',
    'IPDprice',
    'OPDprice',
    'firmname',
    'width',
    'weight',
    'length',
    'height',
    // 'rdu',
    // 'pharmaco',
    // 'subpharmaco',
    // 'Inventorycode',
    'copy',
    'edit',
    'sendDIH'
  ];
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  dataSource: MatTableDataSource<Drugdictionary> = new MatTableDataSource<Drugdictionary>();
  errorMessage = '';
  resData: any;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  foodControl = new FormControl();  //this.foods[0].value  ค่าเริ่มต้น
  form = new FormGroup({
    devices: this.foodControl,
  });
  devices: DeviceSelect[] = [
    {
      value: 'PrePack',
      viewValue: 'PrePack',
    },
    {
      value: 'Original',
      viewValue: 'Original',
    },
  ];
  constructor(
    private settingService: SettingService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.loading = true;
    this.settingService.getMs_Drug().subscribe({
      next: (response) => {
        if (response.status == 200) {
          // console.log(response.data)
          this.resData = response.data;

          // console.log( this.resData )
          this.dataSource = new MatTableDataSource(this.resData);

          // กำหนดค่า paginator และ sort ทันที
          setTimeout(() => {
            if (this.paginator && this.sort) {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          });
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.loading = false;
      },
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter2(filterValue: string) {
    // console.log(filterValue)
    const value = filterValue.trim().toLowerCase();
    this.dataSource.filter = value;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editMS_Drugs(row: any) {
    // console.log('Delete:', row);
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    const dialogRef = this.dialog.open(PopupComponent, {
      maxWidth: 'none',
      maxHeight: 'none',
      width: isMobile ? '95%' : '40%',
      height: isMobile ? '80%' : 'auto',
      panelClass: 'custom-dialog-container',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Edit Drugs bound to device',
        apiUrl: `${this.apiUrl}/setting/devicedrugmanage/msdugs/update`,
        fields: [
          { key: '_id', label: '_id', placeholder: 'Enter device code', value: row._id, disabled: true, type: 'string', hidden: false },
          { key: 'orderitemcode', label: 'orderitemcode', placeholder: 'Enter orderitemcode', disabled: true, value: row.orderitemcode, type: 'string', hidden: true },
          { key: 'orderitemTHname', label: 'orderitemTHname', placeholder: 'Enter orderitemTHname', value: row.orderitemTHname, type: 'string', hidden: true },
          { key: 'orderitemENname', label: 'orderitemENname', placeholder: 'Enter orderitemENname', value: row.orderitemENname, type: 'string', hidden: true },
          { key: 'genericname', label: 'genericname', placeholder: 'Enter genericname', value: row.genericname, type: 'string', hidden: true },
          { key: 'packageratio', label: 'packageratio', placeholder: 'Enter packageratio', value: row.packageratio ? row.packageratio : 0, type: 'number', hidden: true },
          { key: 'packunit', label: 'packunit', placeholder: 'Enter packunit', value: row.packunit ? row.packunit : 'box', type: 'string', hidden: true },
          { key: 'unused', label: 'unused', placeholder: 'Enter unused', value: row.unused, type: 'string', hidden: false },
          { key: 'barcode', label: 'barcode', placeholder: 'Enter barcode', value: row.barcode, type: 'string', hidden: true },
          { key: 'Strength', label: 'Strength', placeholder: 'Enter Strength', value: row.Strength, type: 'string', hidden: true },
          { key: 'dosageunitcode', label: 'dosageunitcode', placeholder: 'Enter dosageunitcode', value: row.dosageunitcode, type: 'string', hidden: true },
          { key: 'capacity', label: 'capacity', placeholder: 'Enter capacity', value: row.capacity, type: 'string', hidden: false },
          { key: 'capacity_unit', label: 'capacity_unit', placeholder: 'Enter capacity_unit', value: row.capacity_unit, type: 'string', hidden: false },
          { key: 'orderunitcode', label: 'orderunitcode', placeholder: 'Enter orderunitcode', value: row.orderunitcode, type: 'string', hidden: true },
          { key: 'description', label: 'description', placeholder: 'Enter description', value: row.description, type: 'string', hidden: true },
          { key: 'pregnancy', label: 'pregnancy', placeholder: 'Enter pregnancy', value: row.pregnancy, type: 'string', hidden: true },
          { key: 'edned', label: 'edned', placeholder: 'Enter edned', value: row.description, type: 'string', hidden: true },
          { key: 'drugaccountcode', label: 'drugaccountcode', placeholder: 'Enter drugaccountcode', value: row.drugaccountcode, type: 'string', hidden: false },
          { key: 'poison', label: 'poison', placeholder: 'Enter poison', value: row.poison, type: 'string', hidden: true },
          { key: 'stdcode', label: 'stdcode', placeholder: 'Enter stdcode', value: row.stdcode, type: 'string', hidden: false },
          { key: 'dosegeform', label: 'dosegeform', placeholder: 'Enter dosegeform', value: row.dosegeform, type: 'string', hidden: true },
          { key: 'displaycolour', label: 'displaycolour', placeholder: 'Enter displaycolour', value: row.displaycolour, type: 'string', hidden: false },
          { key: 'tabcolor', label: 'tabcolor', placeholder: 'Enter tabcolor', value: row.tabcolor, type: 'string', hidden: false },
          { key: 'TMTcode', label: 'TMTcode', placeholder: 'Enter TMTcode', value: row.TMTcode, type: 'string', hidden: true },
          { key: 'GFMIScode', label: 'GFMIScode', placeholder: 'Enter GFMIScode', value: row.GFMIScode, type: 'string', hidden: false },
          { key: 'GPOcode', label: 'GPOcode', placeholder: 'Enter GPOcode', value: row.GPOcode, type: 'string', hidden: false },
          { key: 'cost', label: 'cost', placeholder: 'Enter cost', value: row.cost, type: 'string', hidden: true },
          { key: 'IPDprice', label: 'IPDprice', placeholder: 'Enter IPDprice', value: row.IPDprice, type: 'string', hidden: true },
          { key: 'OPDprice', label: 'OPDprice', placeholder: 'Enter OPDprice', value: row.OPDprice, type: 'string', hidden: true },
          { key: 'firmname', label: 'firmname', placeholder: 'Enter firmname', value: row.firmname, type: 'string', hidden: true },
          { key: 'width', label: 'width', placeholder: 'width', value: row.width, type: 'number', hidden: true },
          { key: 'length', label: 'length', placeholder: 'length', value: row.length, type: 'number', hidden: true },
          { key: 'height', label: 'height', placeholder: 'height', value: row.height, type: 'number', hidden: true },
          { key: 'weight', label: 'weight', placeholder: 'weight', value: row.weight, type: 'number', hidden: true },
          { key: 'rdu', label: 'rdu', placeholder: 'Enter rdu', value: row.rdu, type: 'string', hidden: false },
          { key: 'pharmaco', label: 'pharmaco', placeholder: 'Enter pharmaco', value: row.pharmaco, type: 'string', hidden: false },
          { key: 'subpharmaco', label: 'subpharmaco', placeholder: 'Enter subpharmaco', value: row.subpharmaco, type: 'string', hidden: false },
          { key: 'Inventorycode', label: 'Inventorycode', placeholder: 'Enter Inventorycode', value: row.Inventorycode, type: 'string', hidden: false },
          { key: 'isprepack', label: 'isprepack', placeholder: 'Enter isprepack', value: row.isprepack ? row.isprepack : "Original", type: 'string', hidden: false },
        ],
        elements: {
          datadrug: null
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Updated Data:', result);
        this.getMs_Drug()
      } else {
        //console.log('Edit cancelled');
      }
    });
  }

  perpackMS_Drugs(row: any) {
    // console.log('Delete:', row);
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    const dialogRef = this.dialog.open(PopupComponent, {
      maxWidth: 'none',
      maxHeight: 'none',
      width: isMobile ? '95%' : '40%',
      height: isMobile ? '80%' : 'auto',
      panelClass: 'custom-dialog-container',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Prepack Drugs',
        apiUrl: ``,
        fields: [
          { key: 'orderitemcode', label: 'orderitemcode', placeholder: 'Enter orderitemcode', disabled: true, value: row.orderitemcode, type: 'string', hidden: true },
          { key: 'orderitemTHname', label: 'orderitemTHname', placeholder: 'Enter orderitemTHname', disabled: true, value: row.orderitemTHname, type: 'string', hidden: true },
          { key: 'orderitemENname', label: 'orderitemENname', placeholder: 'Enter orderitemENname', disabled: true, value: row.orderitemENname, type: 'string', hidden: true },
          { key: 'genericname', label: 'genericname', placeholder: 'Enter genericname', disabled: true, value: row.genericname, type: 'string', hidden: true },
          { key: 'packageratio', label: 'packageratio', placeholder: 'Enter packageratio', type: 'number', hidden: true },
          { key: 'packunit', label: 'packunit', placeholder: 'Enter packunit', value: row.packunit ? row.packunit : 'box', type: 'string', hidden: true },
          { key: 'isprepack', label: 'isprepack', placeholder: 'Enter isprepack', value: "Prepack", type: 'string', hidden: false },
        ],
        elements: {
          datadrug: null
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        const isChackpack = this.resData.find((item: any) => item.orderitemcode == `${row.orderitemcode}^${result.packageratio}`);

        console.log('Updated Data:', result);
        if (isChackpack) {
          this.perpackMS_Drugs(row);
          this.toastr.warning('Packageratio already exists', 'แจ้งเตือน', {
            toastClass: 'custom-toast-warning',
          });
          return;
        }
        const updatResult = this.updateData(row, result);
        this.updateMs_Drug(updatResult);
        // console.log(updatResult);
        this.getMs_Drug()
      } else {
        //console.log('Edit cancelled');
      }
    });
  }


  sendDIH(row: any) {
    // console.log(row);
    this.settingService.syncProducts(row).subscribe({
      next: (response) => {
        console.log(response);

        if (response.status === 200) {
          this.toastr.success('Successful!', 'แจ้งเตือน');
          this.getMs_Drug()
        } else {
          // this.loading = false;
        }
      },
      error: (err) => {
        // console.error('Update Failed:', err);
        this.toastr.warning(err, 'แจ้งเตือน', {
          toastClass: 'custom-toast-warning',
        });
      },
    });

  }
  updateData(originalData: any, updatedData: any) {
    // สร้าง object ใหม่โดยไม่รวม _id
    const { _id, ...dataWithoutId } = originalData;

    dataWithoutId.packageratio = updatedData.packageratio;
    dataWithoutId.packunit = updatedData.packunit;
    dataWithoutId.isprepack = `${updatedData.isprepack}`;
    dataWithoutId.orderitemcode = `${originalData.orderitemcode}^${updatedData.packageratio}`;

    if (!originalData.orderitemENname.includes(`*${updatedData.packageratio}`)) {
      dataWithoutId.orderitemENname = `${originalData.orderitemENname} *${updatedData.packageratio}`;
    }
    if (!originalData.orderitemTHname.includes(`*${updatedData.packageratio}`)) {
      dataWithoutId.orderitemTHname = `${originalData.orderitemTHname} *${updatedData.packageratio}`;
    }
    dataWithoutId.barcode = `${originalData.orderitemcode.split('^')[0]}^${updatedData.packageratio}`;

    return dataWithoutId;
  }

  getMs_Drug() {
    this.loading = true;
    this.settingService.getMs_Drug().subscribe({
      next: (response) => {
        if (response.status == 200) {
          const transData = response.data;
          // console.log (this.transformData(response.data))
          // this.drugs = this.transformData(data);
          this.resData = transData;
          this.dataSource.data = this.resData;
          this.dataSource._updateChangeSubscription();
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Login Failed:', err);
      },
    });
  }

  updateMs_Drug(data: any) {
    this.loading = true;
    this.settingService.updateMs_Drug(data).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.toastr.success('Successful!', 'แจ้งเตือน');
          this.getMs_Drug();
          this.loading = false;
        } else {
          this.toastr.warning(response.data, 'แจ้งเตือน', {
            toastClass: 'custom-toast-warning',
          });
          this.loading = false;
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastr.warning(err, 'แจ้งเตือน', {
          toastClass: 'custom-toast-warning',
        });
        console.error('Login Failed:', err);
      },
    });
  }
}

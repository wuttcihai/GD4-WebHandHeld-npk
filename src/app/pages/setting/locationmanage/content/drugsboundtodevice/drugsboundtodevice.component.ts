import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SettingService } from '../../../../../service/setting/device/setting.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { PopupComponent } from '../../../../../components/popup/popup.component';
import { environment } from '../../../../../../environments/environment';
import { NotificationComponent } from '../../../../../components/notification/notification.component';

export interface Drugbound {
  deviceCode: string;
  position: string;
  orderitemcode: string;
  orderitemTHname: string;
  spec: string;
  firmname: string;
  minAmount: string;
  maxAmount: string;
  volume: string;
  packageratio: string;
  actions: string;
}

export interface DeviceSelect {
  value: string;
  viewValue: string;
}

export interface SelectPopup {
  label: string;
  value: string;
}


@Component({
  selector: 'app-drugsboundtodevice',
  standalone: false,

  templateUrl: './drugsboundtodevice.component.html',
  styleUrl: './drugsboundtodevice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class DrugsboundtodeviceComponent {

// }
export class DrugsboundtodeviceComponent implements AfterViewInit {
  displayedColumns: string[] = ['deviceCode', 'position', 'orderitemcode', 'orderitemTHname', 'firmname', 'minAmount', 'maxAmount', 'volume', 'packageratio', 'Actions'];
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  dataSource: MatTableDataSource<Drugbound> = new MatTableDataSource<Drugbound>();
  errorMessage = '';
  resData: any;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  myControl = new FormControl('');

  devices: DeviceSelect[] = [];
  devicesPopup: SelectPopup[] = [];
  ms_DrugPopup: SelectPopup[] = [];
  foodControl = new FormControl();  //this.foods[0].value  ค่าเริ่มต้น
  form = new FormGroup({
    devices: this.foodControl,
  });

  constructor(
    private settingService: SettingService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.loading = true;
    this.settingService.settingDevice().subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.resData = this.transformData(response.data);

          // console.log( this.resData )
          this.dataSource = new MatTableDataSource(this.resData);

          // กำหนดค่า paginator และ sort ทันที
          this.loading = false;
          setTimeout(() => {
            if (this.paginator && this.sort) {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          });
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

  getDrugbound() {
    this.loading = true;
    this.settingService.getDrugsbound().subscribe({
      next: (response) => {
        if (response.status == 200) {
          const transData = this.transformData(response.data);
          // console.log (this.transformData(response.data))
          // this.drugs = this.transformData(data);
          this.loading = false;
          this.resData = transData;
          this.dataSource.data = this.resData; // Update the data
          this.dataSource._updateChangeSubscription(); // Notify the table to update
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


  getDevice() {
    this.loading = true;
    this.settingService.settingDevice().subscribe({
      next: (response) => {
        // console.log('Response from API:', response.data); // ตรวจสอบข้อมูลที่ได้
        if (response.status == 200) {

          // console.log(response.data);
          this.devices = response.data
            .filter((device: any) => device.deviceCode && device.deviceCode !== 'W') // ตรวจสอบ deviceCode
            .sort((a: any, b: any) => (a.deviceCode || '').localeCompare(b.deviceCode || '')) // ป้องกัน error
            .map((device: any) => ({
              value: device.deviceCode,
              viewValue: device.deviceName || 'Unknown' // ตั้งค่าเริ่มต้นถ้าไม่มีชื่อ
            }));
            this.loading = false;
          // console.log("Devices:", this.devices);
          this.devicesPopup = response.data
            // .filter((device: any) => {
            //   if (!device.deviceCode) return false; // ป้องกันค่า null/undefined
            //   return !['W', 'CD-Med_1', 'CD-Med_2', 'SE-MED'].includes(device.deviceCode);
            // })
            .sort((a: any, b: any) => (a.deviceCode || '').localeCompare(b.deviceCode || ''))
            .map((device: any) => ({
              label: device.deviceCode,
              value: device.deviceName || 'Unknown' // ตั้งค่าหากไม่มีชื่อ
            }));

          // console.log("DevicesPopup:", this.devicesPopup);

          this.cdr.detectChanges(); // กระตุ้นการตรวจจับการเปลี่ยนแปลง
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching devices:', err);
        this.loading = false;
      },
    });
  }

  getMsdrug() {
    this.loading = true;
    this.settingService.getMs_Drug().subscribe({
      next: (response) => {
        if (response.status == 200) {
          // console.log(response.data)
          this.ms_DrugPopup = response.data//.slice(0, 12)
            // .sort((a: any, b: any) => a.orderitemENname.localeCompare(b.orderitemENname))
            .map((drug: any) => ({
              value: drug.orderitemcode,
              label: drug.orderitemENname
            }));
            // console.log( this.ms_DrugPopup)
            this.loading = false;
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching devices:', err);
        this.loading = false;
      },
    });
  }


  ngOnInit(): void {
    this.getDrugbound();
    this.getDevice();
    this.getMsdrug()
  }

  newDrugs() {
    this.dialog.closeAll();
    // console.log( this.ms_DrugPopup)
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '40%',
      maxWidth: 'none',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'New Drugs bound to device',
        apiUrl: `${this.apiUrl}/setting/devicedrugmanage/drugs/update`,
        fields: [
          { key: 'deviceCode', label: 'Device', placeholder: 'Select device', type: 'autocomplete' },
          { key: 'drugCode', label: 'Drungs', placeholder: 'Select drungs', type: 'autocomplete' },
          { key: 'datadrug', label: 'datadrug', placeholder: 'Select datadrug', type: 'autocomplete' ,hidden:false},
          { key: 'position', label: 'Position', placeholder: 'Enter position', type: 'number' },
          { key: 'minAmount', label: 'minAmount', placeholder: 'Enter minAmount', type: 'number' },
          { key: 'maxAmount', label: 'maxAmount', placeholder: 'Enter maxAmount', type: 'number' },
          { key: 'volume', label: 'volume', placeholder: 'Enter volume', type: 'number' },
          { key: 'packageratio', label: 'packageratio', placeholder: 'Enter packageratio', type: 'number' },
        ],
        options: {
          deviceCode: this.devicesPopup,
          drugCode: this.ms_DrugPopup.slice(0, 100),
          datadrug: this.ms_DrugPopup
        },
        useLabel: {
          deviceCode: true,
          drugCode: false,
          datadrug: true,
        },
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result !== 'Close' && result !== undefined) {
        this.getDrugbound();
      }
    });
  }


  editDrugs(row: any) {
    // console.log('Delete:', row);
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '40%',
      maxWidth: 'none',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Edit Drugs bound to device',
        apiUrl: `${this.apiUrl}/setting/devicedrugmanage/drugs/update`,
        fields: [
          { key: '_id', label: '_id', placeholder: 'Enter device code', value: row._id, disabled: true, type: 'string' },
          { key: 'deviceCode', label: 'Device Code', placeholder: 'Enter device code', value: row.deviceCode, type: 'string', disabled: true },
          { key: 'position', label: 'position', placeholder: 'Enter position', value: row.position, type: 'number' },
          { key: 'drugCode', label: 'orderitemcode', placeholder: 'orderitemcode', value: row.orderitemcode, type: 'string', disabled: true },
          { key: 'orderitemTHname', label: 'orderitemTHname', placeholder: 'Enter orderitemTHname', value: row.orderitemTHname, type: 'string', disabled: true },
          { key: 'firmname', label: 'firmname', placeholder: 'Enter firmname', value: row.firmname, type: 'string', disabled: true },
          { key: 'minAmount', label: 'minAmount', placeholder: 'Enter minAmount', value: row.minAmount, type: 'number' },
          { key: 'maxAmount', label: 'maxAmount', placeholder: 'Enter maxAmount', value: row.maxAmount, type: 'number' },
          { key: 'volume', label: 'volume', placeholder: 'Enter volume', value: row.volume, type: 'number' },
          { key: 'packageratio', label: 'packageratio', placeholder: 'Enter packageratio', value: row.packageratio, type: 'number' },
          { key: 'createddate', label: 'createddate', placeholder: 'Enter createddate', value: row.createddate, type: 'string', disabled: true },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result !== 'Close' && result !== undefined) {
        // console.log('Updated Data:', result);
        this.getDrugbound()
      } else {
        console.log('Edit cancelled');
      }
    });
  }

  deleteDevice(row: any) {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '25%',
      maxWidth: 'none',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Delete Drugs bound to device',
        message: `Would you like to delete`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result !== 'Close' && result !== undefined) {
        this.settingService.deleteDrugs(row).subscribe({
          next: (response) => {
            // console.log(response);

            if (response.status === 200) {
              this.toastr.success(response.data, 'แจ้งเตือน');
              this.getDrugbound()
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
    });

  }

  transformData(data: any[]): any[] {

    // console.log(data)
    return data
      .map(item => {
        return item.drugdetails.map((drugDetail: any) => ({
          _id: item._id, // Keep the outer _id
          deviceCode: item.deviceCode,
          drugCode: item.drugCode,
          position: item.position,
          minAmount: item.minAmount,
          maxAmount: item.maxAmount,
          volume: item.volume,
          packageratio: item.packageratio,
          spec: item.spec,
          createddate: item.createddate,
          // Flatten drug detail properties without including drugdetails._id
          orderitemcode: drugDetail.orderitemcode,
          GFMIScode: drugDetail.GFMIScode,
          GPOcode: drugDetail.GPOcode,
          IPDprice: drugDetail.IPDprice,
          Inventorycode: drugDetail.Inventorycode,
          OPDprice: drugDetail.OPDprice,
          Strength: drugDetail.Strength,
          TMTcode: drugDetail.TMTcode,
          __v: drugDetail.__v,
          barcode: drugDetail.barcode,
          capacity: drugDetail.capacity,
          capacity_unit: drugDetail.capacity_unit,
          cost: drugDetail.cost,
          dateupdate: drugDetail.dateupdate,
          description: drugDetail.description,
          displaycolour: drugDetail.displaycolour,
          dosageunitcode: drugDetail.dosageunitcode,
          dosegeform: drugDetail.dosegeform,
          drugaccountcode: drugDetail.drugaccountcode,
          edned: drugDetail.edned,
          firmname: drugDetail.firmname,
          genericname: drugDetail.genericname,
          orderitemENname: drugDetail.orderitemENname,
          orderitemTHname: drugDetail.orderitemTHname,
          orderunitcode: drugDetail.orderunitcode,
          pharmaco: drugDetail.pharmaco,
          poison: drugDetail.poison,
          pregnancy: drugDetail.pregnancy,
          rdu: drugDetail.rdu,
          stdcode: drugDetail.stdcode,
          subpharmaco: drugDetail.subpharmaco,
          unused: drugDetail.unused
        }));
      })
      .flat();  // Flatten to get a single array
  }

}

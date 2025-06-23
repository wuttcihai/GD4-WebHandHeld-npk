import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentFormatService } from '../../../../service/setting/paymentformat/setting.service';
import { SettingService } from '../../../../service/setting/device/setting.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../../../components/popup/popup.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NotificationComponent } from '../../../../components/notification/notification.component';

export interface PaymentFormat {
  createddate: string;
  dateupdate: string;
  _id: string;
  orderitemcode: string;
  seq: string;
  orderqty: number;
  packegeqty: number;
  package: string;
  prepack: string;
  location: string;
  isEnabled: string;
  orderitemENname: string;
}

export interface SelectPopup {
  label: string;
  value: string;
}


@Component({
  selector: 'app-paymentformat',
  standalone: false,

  templateUrl: './paymentformat.component.html',
  styleUrl: './paymentformat.component.scss'
})
export class PaymentformatComponent implements AfterViewInit {
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  displayedColumns: string[] = [
    // 'createddate',
    // 'dateupdate',
    // '_id',
    'orderitemcode',
    'orderitemENname',
    'seq',
    'orderqty',
    'packegeqty',
    'package',
    // 'prepack',
    // 'location',
    'isEnabled',
    'Actions'
  ];

  dataSource: MatTableDataSource<PaymentFormat> = new MatTableDataSource<PaymentFormat>();
  errorMessage = '';
  resData: any;
  resDataMsDrugs: any;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  // readonly dialog = inject(MatDialog);
  ms_DrugPopup: SelectPopup[] = [];
  constructor(
    private settingService: SettingService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private paymentFormatService: PaymentFormatService,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    // this.loading = true;
    // this.paymentFormatService.getPaymentFormat().pipe(
    //   take(1) // รับข้อมูลเพียงครั้งเดียว
    // ).subscribe({
    //   next: (response) => {
    //     if (response.status == 200) {
    //       console.log(response.data);
    //       this.resData = response.data.sort((a: any, b: any) => a.orderitemcode.localeCompare(b.orderitemcode));
    //       this.dataSource = new MatTableDataSource(this.resData);

    //       setTimeout(() => {
    //         if (this.paginator && this.sort) {
    //           this.dataSource.paginator = this.paginator;
    //           this.dataSource.sort = this.sort;
    //         }
    //       });
    //     }
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     console.error('Login Failed:', err);
    //   },
    // });
    this.getPaymentFormat()
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getMsdrug()
  }

  editPaymentFormat(deviceData: any) {
    // console.log(deviceData);
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
        title: 'Edit วิธีจ่ายยา',
        apiUrl: `${this.apiUrl}/setting/paymentformat/update`,
        fields: [
          { key: '_id', label: '_id', placeholder: 'Enter _id', value: deviceData._id, disabled: true, type: 'string', hidden: false },
          { key: 'orderitemcode', label: 'MedCode', placeholder: 'Enter MedCode', value: deviceData.orderitemcode, disabled: true, type: 'string' },
          { key: 'orderitemENname', label: 'MedName', placeholder: 'Enter MedName', value: deviceData.orderitemENname, type: 'string', disabled: true },
          { key: 'seq', label: 'seq', placeholder: 'Enter seq', value: deviceData.seq, type: 'string', hidden: false },
          { key: 'orderqty', label: 'orderqty', placeholder: 'Enter orderqty', value: deviceData.orderqty, type: 'number' },
          { key: 'packegeqty', label: 'packegeqty', placeholder: 'Enter packegeqty', value: deviceData.packegeqty, type: 'number', hidden: false },
          { key: 'package', label: 'package', placeholder: 'Enter package', value: deviceData.package, type: 'string', },
          { key: 'prepack', label: 'prepack', placeholder: 'Enter prepack', value: deviceData.prepack, type: 'string', hidden: false },
          { key: 'location', label: 'location', placeholder: 'Enter location', value: deviceData.location, type: 'string', hidden: false },
          { key: 'createddate', label: 'createddate', placeholder: 'Enter createddate', value: deviceData.createddate, type: 'string', hidden: false },
          { key: 'isEnabled', label: 'isEnabled', placeholder: 'Enter isEnabled', value: deviceData.isEnabled, type: 'string', hidden: false }, // แปลง 'Y' เป็น true
        ]
      }
    });



    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Updated Data:', result);
        this.getPaymentFormat()
      } else {
        // console.log('Edit cancelled');
      }
    });
  }

  newPaymentFormat() {
    this.dialog.closeAll();
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
        title: 'Add วิธีจ่ายยา',
        apiUrl: `${this.apiUrl}/setting/paymentformat/update`,
        fields: [
          // { key: 'lable', label: 'เลือกรายการยา', placeholder: 'เลือกรายการยา', type: 'string',disabled: true },
          { key: 'orderitemcode', label: 'drug', placeholder: 'Select drug', type: 'autocomplete' },
          { key: 'datadrug', label: 'datadrug', placeholder: 'Select datadrug', type: 'autocomplete', hidden: false },
          // { key: 'orderitemcode', label: 'MedCode', placeholder: 'Enter MedCode', type: 'string' },
          // { key: 'orderitemENname', label: 'MedName', placeholder: 'Enter MedName', type: 'string' },
          // { key: 'seq', label: 'seq', placeholder: 'Enter seq', type: 'string' },
          { key: 'orderqty', label: 'orderqty', placeholder: 'Enter orderqty', type: 'number' },
          // { key: 'packegeqty', label: 'packegeqty', placeholder: 'Enter packegeqty', type: 'number' },
          { key: 'package', label: 'package', placeholder: 'Enter package', type: 'string' },
          { key: 'prepack', label: 'prepack', placeholder: 'Enter prepack', type: 'string', hidden: false, value: 'Y' },
          { key: 'location', label: 'location', placeholder: 'Enter location', type: 'string', hidden: false, value: 'SE MED' },
          // { key: 'createddate', label: 'createddate', placeholder: 'Enter createddate', type: 'string', hidden: false },
          { key: 'isEnabled', label: 'isEnabled', placeholder: 'Enter isEnabled', value: 'Y', type: 'string', hidden: false },
          // { key: 'isEnabled', label: 'isEnabled', placeholder: 'Enter isEnabled', value: 'Y', type: 'boolean' }, // แปลง 'Y' เป็น true
        ],
        options: {
          orderitemcode: this.ms_DrugPopup,
          datadrug: this.ms_DrugPopup
        },
        useLabel: {
          orderitemcode: false,
          datadrug: false,
        },
      }
    });



    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Received Data:', result);
        this.getPaymentFormat()
      } else {
        // console.log('Dialog closed without data');
      }
    });
  }


  getPaymentFormat() {
    this.loading = true;
    this.paymentFormatService.getPaymentFormat().pipe(
      take(1)
    ).subscribe({
      next: (response) => {

        if (response.status == 200) {
          this.resData = response.data;

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
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Login Failed:', err);
      },
    });
  }

  deleteaymentFormat(row: any) {
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
        this.paymentFormatService.deletePaymentFormat(row).subscribe({
          next: (response) => {
            // console.log(response);

            if (response.status === 200) {
              this.loading = false;
              this.toastr.success(response.data, 'แจ้งเตือน');
              this.getPaymentFormat()
            } else {
              this.loading = false;
            }
          },
          error: (err) => {
            // console.error('Update Failed:', err);
            this.loading = false;
            this.toastr.warning(err, 'แจ้งเตือน', {
              toastClass: 'custom-toast-warning',
            });
          },
        });
      }
    });

  }

  getMsdrug() {
    this.loading = true;
    this.settingService.getMs_Drug().subscribe({
      next: (response) => {
        if (response.status == 200) {
          // console.log(response.data)
          this.resDataMsDrugs = response.data;
          this.ms_DrugPopup = response.data.filter((drug: any) => drug.isprepack == "Original")
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

  onToggleChange(event: MatSlideToggleChange, row: any): void {
    row.isEnabled = event.checked ? 'Y' : 'N';
    // console.log(JSON.stringify(row, null, 2));

    this.paymentFormatService.updatePaymentFormat(row).subscribe({
      next: (response) => {
        // console.log(response);

        if (response.status === 200) {
          this.toastr.success('Successful!', 'แจ้งเตือน');
          this.getPaymentFormat()
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
}

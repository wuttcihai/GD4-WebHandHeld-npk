import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SettingService } from '../../../../../service/setting/device/setting.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../../../../components/popup/popup.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';





export interface Device {
  deviceCode: string;
  deviceName: string;
  deviceDesc: string;
  deviceIP: string;
  computerName: string;
  pharmacyCode: string;
  sortOrder: string;
  isEnabled: string;
  orderzone: string;
}

export interface APIResponse {
  status: number;
  data?: any;
}

@Component({
  selector: 'app-devicemanage',
  standalone: false,

  templateUrl: './devicemanage.component.html',
  styleUrl: './devicemanage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicemanageComponent implements AfterViewInit {
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  displayedColumns: string[] = ['deviceCode', 'deviceName', 'deviceDesc', 'deviceIP', 'computerName', 'pharmacyCode', 'sortOrder', 'orderzone', 'isEnabled','edit'];
  dataSource: MatTableDataSource<Device> = new MatTableDataSource<Device>();
  errorMessage = '';
  resData: any;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  // readonly dialog = inject(MatDialog);
  constructor(
    private settingService: SettingService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.loading = true;
    this.settingService.settingDevice().subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.resData = response.data;
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

  getDevice() {
    this.loading = true;
    this.settingService.settingDevice().subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.resData = response.data;
          // console.log( this.resData )
          this.loading = false;
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

  editRow(row: any) {
    // console.log("Editing row:", row);
    // เพิ่มโค้ดเปิด dialog หรือฟอร์มแก้ไขข้อมูลที่นี่
  }


  openPopup() {
    this.dialog.closeAll();
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
      const dialogRef = this.dialog.open(PopupComponent, {
        maxWidth: 'none',
        maxHeight: 'none',
        width: isMobile ? '95%' : '40%',
        height: isMobile ? '80%' : 'auto',
        panelClass: 'custom-dialog-container',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '500ms',
        data: {
          title: 'Add Device',
          apiUrl: `${this.apiUrl}/setting/devicedrugmanage/device/update`,
          fields: [
            { key: 'deviceCode', label: 'Device Code', placeholder: 'Enter device code', type: 'string' },
            { key: 'deviceName', label: 'Device Name', placeholder: 'Enter device name', type: 'string' },
            { key: 'deviceDesc', label: 'Device Desc', placeholder: 'Enter device desc', type: 'string' },
            { key: 'deviceIP', label: 'Device IP', placeholder: 'Enter device ip', type: 'string' },
            { key: 'computerName', label: 'Computer Name', placeholder: 'Enter computer name', type: 'string' },
            { key: 'pharmacyCode', label: 'Pharmacy Code', placeholder: 'Enter pharmacy code', type: 'string' },
            { key: 'sortOrder', label: 'sortOrder', placeholder: 'Enter sortOrder', type: 'number' },
            { key: 'orderzone', label: 'orderzone', placeholder: 'Enter orderzone', value:0, type: 'number' },
            { key: 'isEnabled', label: 'isEnabled', placeholder: 'Enter isEnabled', value: false, type: 'boolean' },
          ]
        }
      });



      dialogRef.afterClosed().subscribe(result => {
        if (result !== 'Close' && result !== undefined) {
          // console.log('Received Data:', result);
          this.getDevice()
        } else {
          // console.log('Dialog closed without data');
        }
      });
  }

  editDevice(deviceData: any) {
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
      const dialogRef = this.dialog.open(PopupComponent, {
        maxWidth: 'none',
        maxHeight: 'none',
        width: isMobile ? '95%' : '40%',
        height: isMobile ? '80%' : 'auto',
        panelClass: 'custom-dialog-container',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Edit Device',
        apiUrl: `${this.apiUrl}/setting/devicedrugmanage/device/update`,
        fields: [
          { key: '_id', label: '_id', placeholder: 'Enter device code', value: deviceData._id, disabled: true, type: 'string' },
          { key: 'deviceCode', label: 'Device Code', placeholder: 'Enter device code', value: deviceData.deviceCode, type: 'string' },
          { key: 'deviceName', label: 'Device Name', placeholder: 'Enter device name', value: deviceData.deviceName, type: 'string' },
          { key: 'deviceDesc', label: 'Device Desc', placeholder: 'Enter device desc', value: deviceData.deviceDesc, type: 'string' },
          { key: 'deviceIP', label: 'Device IP', placeholder: 'Enter device ip', value: deviceData.deviceIP, type: 'string' },
          { key: 'computerName', label: 'Computer Name', placeholder: 'Enter computer name', value: deviceData.computerName, type: 'string' },
          { key: 'pharmacyCode', label: 'Pharmacy Code', placeholder: 'Enter pharmacy code', value: deviceData.pharmacyCode, type: 'string' },
          { key: 'sortOrder', label: 'sortOrder', placeholder: 'Enter sortOrder', value: deviceData.sortOrder, type: 'number' },
          { key: 'orderzone', label: 'orderzone', placeholder: 'Enter orderzone', value: deviceData.orderzone ?? 0, type: 'number' },
          { key: 'isEnabled', label: 'isEnabled', placeholder: 'Enter isEnabled', value: deviceData.isEnabled === 'Y', type: 'boolean' }, // แปลง 'Y' เป็น true
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Updated Data:', result);
        this.getDevice()
      } else {
        console.log('Edit cancelled');
      }
    });
  }

  onToggleChange(event: MatSlideToggleChange, row: any): void {
    row.isEnabled = event.checked ? 'Y' : 'N';
    // console.log(JSON.stringify(row, null, 2));

    this.settingService.updateDevice(row).subscribe({
      next: (response) => {
        console.log(response);

        if (response.status === 200) {
          this.toastr.success('Successful!', 'แจ้งเตือน');
          this.getDevice()
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






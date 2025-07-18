import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SettingService } from '../../../../../service/setting/users/setting.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PopupComponent } from '../../../../../components/popup/popup.component';
import { environment } from '../../../../../../environments/environment';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PopupstepperComponent } from '../../../../../components/popupstepper/popupstepper.component';

export interface User {
  userID: string;
  fullname?: string;
  positioncode?: string;
  userbarcode?: string;
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  departmentcode?: string;
  type?: string;
  suspended?: string;
  createDT?: string;
  titlename?: string;
  description?: string;
  delete?: string;
  authorized?: any[];
}

export interface SelectPopup {
  label: string;
  value: string;
}

@Component({
  selector: 'app-manageusers',
  standalone: false,

  templateUrl: './manageusers.component.html',
  styleUrl: './manageusers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageusersComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'userID',
    'username',
    'fullname',
    'type',
    'departmentcode',
    'suspended',
    'authorized',
    // 'edit',
  ];
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  errorMessage = '';
  resData: any;
  loading: boolean = false;
  groupUserPopup: SelectPopup[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private settingService: SettingService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.loading = true;
    this.settingService.getUser().subscribe({
      next: (response) => {
        if (response.status == 200) {
          // console.log(response.data)
          this.resData = response.data;

          // console.log( this.resData )
          this.dataSource = new MatTableDataSource(this.resData);
          setTimeout(() => {
            if (this.paginator && this.sort) {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          });

        } else {

        }
        this.loading = false;
        this.cdr.detectChanges();
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

  // ngOnInit(): void {
  //   this.getGroupUser()
  // }

  //   ngOnInit() {
  //     this.getGroupUser()
  //     this.dataSource = new MatTableDataSource();
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  // }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // ตรวจสอบว่ามีการประกาศ ViewChild ถูกต้อง
    // @ViewChild(MatSort) sort!: MatSort;
    // @ViewChild(MatPaginator) paginator!: MatPaginator;
  }

  newUser() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '40%',
      maxWidth: 'none',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'เพิ่มผู้ใช้งานใหม่',
        apiUrl: `${this.apiUrl}/setting/usermanage/users/update`,
        fields: [
          { key: 'userID', label: 'userID', placeholder: 'userID', type: 'string' },
          { key: 'firstname', label: 'ชื่อ', placeholder: 'ชื่อ', type: 'string', hidden: true },
          { key: 'lastname', label: 'นามสกุล', placeholder: 'นามสกุล', type: 'string', hidden: true },
          { key: 'username', label: 'ชื่อเข้าใช้งาน', placeholder: 'Enter ชื่อเข้าใช้งาน', type: 'string', hidden: true },
          { key: 'password', label: 'password', placeholder: 'Enter password', value: 'gd456', type: 'string', hidden: false },
          { key: 'departmentcode', label: 'ตำแหน่ง', placeholder: 'ตำแหน่ง', type: 'string', hidden: true },
          { key: 'delete', label: 'delete', placeholder: 'Enter delete', value: 'Y', type: 'string', hidden: false },
          { key: 'suspended', label: 'suspended', placeholder: 'Enter suspended', value: 'Y', type: 'string', hidden: false },
          { key: 'type', label: 'กลุ่มผู้ใช้งาน', placeholder: 'กลุ่มผู้ใช้งาน', type: 'autocomplete' },
          { key: 'authorized', label: 'authorized', placeholder: 'authorized', type: 'manageuserscomponent', hidden: false },
          // { key: 'suspended', label: 'suspended', placeholder: 'Enter suspended', type: 'isEnabled' },
        ],
        options: {
          type: this.groupUserPopup
        },
        useLabel: {
          type: true,
        },
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Updated Data:', result);
        this.getUser()
      } else {
        // console.log('Edit cancelled');
      }
    });

  }

  editUser(row: any) {
    // console.log('Delete:', this.groupUserPopup);
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '40%',
      maxWidth: 'none',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'แก้ไขผู้ใช้งาน',
        apiUrl: `${this.apiUrl}/setting/usermanage/users/update`,
        fields: [
          { key: '_id', label: '_id', placeholder: 'Enter device code', value: row._id, disabled: true, type: 'string', hidden: false },
          { key: 'userID', label: 'รหัสผู้ใช้งาน', placeholder: 'รหัสผู้ใช้งาน', disabled: true, value: row.userID, type: 'string', hidden: true },
          { key: 'titlename', label: 'type', placeholder: 'Enter titlename', value: row.titlename, type: 'string', hidden: false },
          { key: 'fullname', label: 'fullname', placeholder: 'Enter fullname', value: row.fullname, type: 'string', hidden: false },
          { key: 'firstname', label: 'ชื่อ', placeholder: 'ชื่อ', value: row.firstname, type: 'string', hidden: true },
          { key: 'lastname', label: 'นามสกุล', placeholder: 'นามสกุล', value: row.lastname, type: 'string', hidden: true },
          { key: 'positioncode', label: 'positioncode', placeholder: 'Enter positioncode', value: row.positioncode, type: 'string', hidden: false },
          { key: 'userbarcode', label: 'userbarcode', placeholder: 'Enter userbarcode', value: row.userbarcode, type: 'string', hidden: false },
          { key: 'username', label: 'ชื่อเข้าใช้งาน', placeholder: 'Enter ชื่อเข้าใช้งาน', value: row.username, type: 'string', hidden: true },
          { key: 'password', label: 'password', placeholder: 'Enter password', value: row.password, type: 'string', hidden: false },
          { key: 'departmentcode', label: 'ตำแหน่ง', placeholder: 'ตำแหน่ง', value: row.departmentcode, type: 'string', hidden: true },
          { key: 'type', label: 'กลุ่ม', placeholder: 'Enter type', value: row.type, type: 'string', hidden: false },
          { key: 'suspended', label: 'ระงับผู้ใช้', placeholder: 'ระงับผู้ใช้', value: row.suspended === 'Y', type: 'isEnabled', hidden: true },
          { key: 'createDT', label: 'createDT', placeholder: 'Enter createDT', value: row.createDT, type: 'string', hidden: false },
          { key: 'delete', label: 'delete', placeholder: 'Enter delete', value: row.delete, type: 'string', hidden: false },
          { key: 'authorized', label: 'authorized', placeholder: 'Enter authorized', value: row.authorized.map((item: any) => item.sidebar_id), type: 'string', hidden: false },
        ],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Updated Data:', result);
        this.getUser()
      } else {
        // console.log('Edit cancelled');
      }
    });
  }

  authorized(row: any) {
    // console.log('row:', row);
    const dialogRef = this.dialog.open(PopupstepperComponent, {
      width: '40%',
      height: '80%',
      maxWidth: 'none',
      maxHeight: 'none',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'กำหนดสิทธิผู้ใช้งาน',
        apiUrl: `${this.apiUrl}/setting/usermanage/users/update`,
        dataRow: row,
        comeFrom: false

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Updated Data:', result);
        this.getUser()
      } else {
        console.log('Edit cancelled');
      }
    });
  }

getUser() {
    this.loading = true;
    this.settingService.getUser().subscribe({
        next: (response) => {
            if (response.status == 200) {
                // ตรวจสอบและแปลงข้อมูลให้เป็น array
                this.resData = Array.isArray(response.data) ? response.data : [response.data];
                
                // อัพเดท DataSource
                this.dataSource.data = this.resData;
                
                // อัพเดท pagination และ sorting
                if (this.dataSource.paginator) {
                    this.dataSource.paginator.firstPage();
                }
                if (this.dataSource.sort) {
                    this.dataSource.sort.sortChange.emit();
                }
            }
            this.loading = false;
            this.cdr.detectChanges();
        },
        error: (err) => {
            console.error('Error fetching users:', err);
            this.loading = false;
            this.cdr.detectChanges();
        },
    });
}
  //   getUser() {
  //     this.loading = true;

  //  console.log( "response.data")
  //     this.dataSource.data = [];
  //     this.cdr.detectChanges();

  //     this.settingService.getUser().subscribe({
  //       next: (response) => {
  //         console.log( response.data)
  //         if (response.status == 200 && response.data) {
  //           this.loading = false;
  //           // ตรวจสอบว่ามีข้อมูลและเป็น Array
  //           if (Array.isArray(response.data)) {
  //             this.resData = response.data;
  //             // console.log( response.data)
  //             // วิธีที่ 1: อัปเดตข้อมูลแบบปกติ
  //             this.dataSource.data = this.resData;

  //             // วิธีที่ 2: สร้าง DataSource ใหม่หากวิธีแรกไม่ทำงาน
  //             this.dataSource = new MatTableDataSource(this.resData);
  //             this.dataSource.sort = this.sort;
  //             this.dataSource.paginator = this.paginator;

  //             // แจ้งให้ตารางรีเฟรช
  //             this.dataSource._updateChangeSubscription();

  //         this.loading = false;
  //         this.cdr.detectChanges();
  //           } else {
  //             console.warn('Invalid data format:', response.data);
  //             this.dataSource.data = [];

  //         this.loading = false;
  //         this.cdr.detectChanges();
  //           }
  //         } else {
  //           this.dataSource.data = [];
  //           console.warn('No data received or invalid status:', response);
  //         }

  //       },
  //       error: (err) => {
  //         console.error('Error fetching users:', err);
  //         this.dataSource.data = [];
  //         this.loading = false;
  //         this.cdr.detectChanges();

  //         // แสดงข้อความ error ให้ผู้ใช้ทราบ (optional)
  //         this.toastr.warning(err, 'แจ้งเตือน', {
  //           toastClass: 'custom-toast-warning',
  //         });
  //       }
  //     });
  //   }

  getGroupUser() {
    this.loading = true;
    this.settingService.getGroupUser().subscribe({
      next: (response) => {
        if (response.status == 200) {
          // console.log( response.data)
          this.groupUserPopup = response.data
            .sort((a: any, b: any) => a.groupname.localeCompare(b.groupname))
            .map((device: any, index: Number) => ({
              label: device.groupname,
              value: device.authorized
            }));
          this.loading = false;
          this.cdr.detectChanges();
          // console.log( this.groupUserPopup)
        } else {
          this.loading = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onToggleChange(event: MatSlideToggleChange, row: any): void {
    this.loading = true;
    row.suspended = event.checked ? 'Y' : 'N';
    row.authorized = row.authorized.map((item: any) => item.sidebar_id)
    // console.log(JSON.stringify(row, null, 2));

    this.settingService.updateUser(row).subscribe({
      next: (response) => {
        // console.log(response);

        if (response.status === 200) {
          this.toastr.success('Successful!', 'แจ้งเตือน');
          this.getUser();
        } else {
          // this.loading = false;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        // console.error('Update Failed:', err);
        this.loading = false;
        this.toastr.warning(err, 'แจ้งเตือน', {
          toastClass: 'custom-toast-warning',
        });
        this.cdr.detectChanges();
      },
    });
  }

}


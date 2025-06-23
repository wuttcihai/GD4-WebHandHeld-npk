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

export interface GroupUser {
  groupname: string;
  suspended?: string;
  createddate?: string;
  authorized?: any[];
}

@Component({
  selector: 'app-managegroupuser',
  standalone: false,
  
  templateUrl: './managegroupuser.component.html',
  styleUrl: './managegroupuser.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagegroupuserComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'groupname',
    'suspended',
    'authorized',
    // 'edit'
  ];
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
    dataSource: MatTableDataSource<GroupUser> = new MatTableDataSource<GroupUser>();
    errorMessage = '';
    resData: any;
    loading: boolean = false;
    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
    @ViewChild(MatSort) sort: MatSort | null = null;
  
    constructor(
      private settingService: SettingService,
      private dialog: MatDialog,
      private cdr: ChangeDetectorRef,
      private toastr: ToastrService
    ) {
      this.loading = true;
      this.settingService.getGroupUser().subscribe({
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
              this.loading = false;
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

    authorized(row: any) {
      // console.log('row:', row)
      // const authorizedData = [
      //   // ข้อมูล JSON ที่ให้มา
      // ];
      
      // const filteredData = row.filter(item => item.pharmacycode === "IPD" && item.isEnabled === "Y");
      
      // console.log(filteredData);
      
      const dialogRef = this.dialog.open(PopupstepperComponent, {
        width: '40%',
        height:'80%',
        maxWidth: 'none',
        maxHeight: 'none',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          title: 'กำหนดสิทธิกลุ่มผู้ใช้งาน',
          apiUrl: `${this.apiUrl}/setting/usermanage/group/update`,
          dataRow:row,
          comeFrom:true
          
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result !== 'Close' && result !== undefined) {
          // console.log('Updated Data:', result);
          this.getGroupUser()
        } else {
          console.log('Edit cancelled');
        }
      });
    }

    newGroupUser() {
      this.dialog.closeAll();
        const dialogRef = this.dialog.open(PopupComponent, {
          width: '40%',
          maxWidth: 'none',
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '500ms',
          data: {
            title: 'Add Device',
            apiUrl: `${this.apiUrl}/setting/usermanage/group/update`,
            fields: [
              { key: 'groupname', label: 'ชื่อกลุ่ม', placeholder: 'ชื่อกลุ่ม', type: 'string' },
              { key: 'suspended', label: 'suspended', placeholder: 'Enter suspended', type: 'isEnabled' },
            ]
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result !== 'Close' && result !== undefined) {
            // console.log('Updated Data:', result);
            this.getGroupUser()
          } else {
            // console.log('Edit cancelled');
          }
        });

      }  

    editGroupUser(row: any) {
      // console.log('Delete:', row);
      const dialogRef = this.dialog.open(PopupComponent, {
        width: '40%',
        maxWidth: 'none',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          title: 'แก้ไขกลุ่มผู้ใช้งาน',
          apiUrl: `${this.apiUrl}/setting/usermanage/group/update`,
          fields: [
            { key: '_id', label: '_id', placeholder: 'Enter device code', value: row._id, disabled: true, type: 'string',hidden: false },
            { key: 'groupname', label: 'ชื่อกลุ่ม', placeholder: 'ชื่อกลุ่ม' ,disabled: false, value: row.groupname, type: 'string',hidden: true},
            { key: 'suspended', label: 'suspended', placeholder: 'Enter suspended', value: row.suspended === 'Y', type: 'isEnabled',hidden: true },
            { key: 'authorized', label: 'authorized', placeholder: 'Enter authorized', value: row.authorized.map((item: any) => item.sidebar_id) , type: 'string',hidden: false },
            { key: 'createddate', label: 'createddate', placeholder: 'Enter createddate', value: row.createddate, type: 'string',hidden: false },
          ]
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result !== 'Close' && result !== undefined) {
          // console.log('Updated Data:', result);
          this.getGroupUser()
        } else {
          // console.log('Edit cancelled');
        }
      });
    }

    getGroupUser() {
      this.loading = true;
      this.settingService.getGroupUser().subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.resData = response.data;
            // console.log( this.resData )
            this.dataSource.data = this.resData; // Update the data
            this.dataSource._updateChangeSubscription(); // Notify the table to update
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
  

    onToggleChange(event: MatSlideToggleChange, row: any): void {
      row.suspended = event.checked ? 'Y' : 'N';
      // console.log(this.transformData(row));
  
      this.settingService.updateGroupUser(this.transformData(row)).subscribe({
        next: (response) => {
          // console.log(response);
  
          if (response.status === 200) {
            this.toastr.success('Successful!', 'แจ้งเตือน');
            this.getGroupUser()
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

   transformData = (data: any) => {
      return {
        _id: data._id,
        groupname: data.groupname,
        suspended: data.suspended,
        authorized: data.authorized.map((item: any) => item.sidebar_id),
        createddate: data.createddate,
        dateupdate: data.dateupdate
      };
    };
    
}

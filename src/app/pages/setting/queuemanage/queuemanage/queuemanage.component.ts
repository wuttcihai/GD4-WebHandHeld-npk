import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QueueService } from '../../../../service/setting/queuemanage/queuemanage.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../../../components/popup/popup.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { take } from 'rxjs';
import { NotificationComponent } from '../../../../components/notification/notification.component';


export interface Device {
  queuechannel: string;
  queueip: string;
  queuedesc: string;
  isEnabled: string;

}

export interface APIResponse {
  status: number;
  data?: any;
}
@Component({
  selector: 'app-queuemanage',
  standalone: false,

  templateUrl: './queuemanage.component.html',
  styleUrl: './queuemanage.component.scss'
})
export class QueuemanageComponent implements AfterViewInit {
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  displayedColumns: string[] = ['queuechannel', 'queueip', 'queuedesc', 'isEnabled', 'Actions'];
  dataSource: MatTableDataSource<Device> = new MatTableDataSource<Device>();
  errorMessage = '';
  resData: any;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  // readonly dialog = inject(MatDialog);
  constructor(
    private queueService: QueueService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
  ) { this.getQueueSetting(); }
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
  getQueueSetting() {
    this.loading = true;
    this.queueService.getQueueSetting().pipe(
      take(1)
    ).subscribe({
      next: (response) => {

        if (response.status == 200) {
          this.loading = false;
          this.resData = response.data;
          this.dataSource.data = this.resData;
          this.dataSource._updateChangeSubscription();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        console.error('Login Failed:', err);
      },
    });
  }

  onToggleChange(event: MatSlideToggleChange, row: any): void {
    row.isEnabled = event.checked ? 'Y' : 'N';
    // console.log(JSON.stringify(row, null, 2));

    this.queueService.updateQueueSetting(row).subscribe({
      next: (response) => {
        // console.log(response);

        if (response.status === 200) {
          this.toastr.success('Successful!', 'แจ้งเตือน');
          this.getQueueSetting()
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

  editQueueSetting(deviceData: any) {
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
        title: 'Edit Channel Queue',
        apiUrl: `${this.apiUrl}/setting/queue/update`,
        fields: [
          { key: '_id', label: '_id', placeholder: 'Enter device code', value: deviceData._id, hidden: false, type: 'string' },
          { key: 'queuechannel', label: 'ช่องจ่าย', placeholder: 'ช่องจ่าย', value: deviceData.queuechannel, disabled: false, type: 'number' },
          { key: 'queueip', label: 'IP', placeholder: 'IP', value: deviceData.queueip, disabled: false, type: 'string' },
          { key: 'queuedesc', label: 'คำอธิบาย', placeholder: 'คำอธิบาย', value: deviceData.queuedesc, disabled: false, type: 'string' },
          { key: 'isEnabled', label: 'isEnabled', placeholder: 'isEnabled', value: deviceData.isEnabled, hidden: false, type: 'string' },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Updated Data:', result);
        this.getQueueSetting()
      } else {
        console.log('Edit cancelled');
      }
    });
  }


    deleteQueueSetting(row: any) {
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
          this.queueService.deleteQueueSetting(row).subscribe({
            next: (response) => {
              // console.log(response);
  
              if (response.status === 200) {
                this.loading = false;
                this.toastr.success(response.data, 'แจ้งเตือน');
                this.getQueueSetting()
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

    newQueueSetting() {
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
            title: 'And Channel Queue',
            apiUrl: `${this.apiUrl}/setting/queue/update`,
            fields: [
              { key: 'queuechannel', label: 'ช่องจ่าย', placeholder: 'ช่องจ่าย', disabled: false, type: 'number' },
              { key: 'queueip', label: 'IP', placeholder: 'IP',   disabled: false, type: 'string' },
              { key: 'queuedesc', label: 'คำอธิบาย', placeholder: 'คำอธิบาย', disabled: false, type: 'string' },
              { key: 'isEnabled', label: 'isEnabled', placeholder: 'isEnabled', value: 'Y', hidden: false, type: 'string' },
            ]
          }
        });
  
  
  
        dialogRef.afterClosed().subscribe(result => {
          if (result !== 'Close' && result !== undefined) {
            // console.log('Received Data:', result);
            this.getQueueSetting()
          } else {
            // console.log('Dialog closed without data');
          }
        });
    }
}

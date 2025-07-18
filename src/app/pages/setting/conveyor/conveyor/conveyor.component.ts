import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConveyorService } from '../../../../service/setting/conveyor/conveyor.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../../../components/popup/popup.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { take } from 'rxjs';


export interface Conveyor {
  IP: string;
  point_id: string;
  shelfzonesum: string;
  zone_id: string;
  shelfzone: string;
  description: string;
  check_yes: string;
  check_no: string;
  point_idsum: string;
  isEnabled: string;
  createddate: string;
  dateupdate: string;
}

export interface APIResponse {
  status: number;
  data?: any;
}
@Component({
  selector: 'app-conveyor',
  standalone: false,

  templateUrl: './conveyor.component.html',
  styleUrl: './conveyor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConveyorComponent implements AfterViewInit {
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  displayedColumns: string[] = [
    // 'IP',
    // 'point_id',
    // 'shelfzonesum',
    'zone_id',
    'point_idsum',
    'shelfzone',
    'description',
    'check_yes',
    'check_no',
    'isEnabled',
    'edit'
  ];
  dataSource: MatTableDataSource<Conveyor> = new MatTableDataSource<Conveyor>();
  errorMessage = '';
  resData: any;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // readonly dialog = inject(MatDialog);
  constructor(
    private conveyorService: ConveyorService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) { this.getPaymentFormat(); }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.paginator.pageSize = 50;
      this.paginator.page.emit({
        pageIndex: this.paginator.pageIndex,
        pageSize: 50,
        length: this.paginator.length
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPaymentFormat() {
    this.loading = true;
    this.conveyorService.getConveyorSetting().pipe(
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

    this.conveyorService.updateConveyorSetting(row).subscribe({
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

  getCheckYesIcon(checkYesValue: string): string {
    switch (checkYesValue) {
      case 'N': return 'arrow_upward';
      case 'R': return 'arrow_forward';
      case 'L': return 'arrow_back';
      default: return '';
    }
  }

  editConveyor(rowData: any) {
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
        title: 'Edit Conveyor',
        apiUrl: `${this.apiUrl}/setting/conveyor/update`,
        fields: [
          { key: '_id', label: '_id', placeholder: 'Enter device code', value: rowData._id, disabled: true, type: 'string', hidden: false },
          { key: 'IP', label: 'IP', placeholder: 'IP', value: rowData.IP, type: 'number', hidden: false },
          { key: 'point_id', label: 'point_id', placeholder: 'point_id', value: rowData.point_id, type: 'number', hidden: false },
          { key: 'zone_id', label: 'Zone ID', placeholder: 'Zone ID', value: rowData.zone_id, type: 'string',disabled: true },
          { key: 'point_idsum', label: 'Point ID', placeholder: 'Point ID', value: rowData.point_idsum, type: 'number' },
          { key: 'shelfzone', label: 'shelfzone', placeholder: 'shelfzone', value: rowData.shelfzone, type: 'string' },
          { key: 'description', label: 'description', placeholder: 'description', value: rowData.description, type: 'string' },
          { key: 'check_yes', label: 'check_yes', placeholder: 'check_yes', value: rowData.check_yes, type: 'string' },
          { key: 'check_no', label: 'check_no', placeholder: 'check_no', value: rowData.check_no, type: 'string' },
          { key: 'isEnabled', label: 'isEnabled', placeholder: 'isEnabled', value: rowData.isEnabled, type: 'string', hidden: false },
          { key: 'shelfzonesum', label: 'shelfzonesum', placeholder: 'shelfzonesum', value: rowData.isEnabled, type: 'string', hidden: false },
          { key: 'createddate', label: 'createddate', placeholder: 'createddate', value: rowData.createddate, type: 'string', hidden: false },
        ],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close') {
        // console.log('Updated Data:', result);
        this.getPaymentFormat()
      } else {
        console.log('Edit cancelled');
      }
    });
  }
}

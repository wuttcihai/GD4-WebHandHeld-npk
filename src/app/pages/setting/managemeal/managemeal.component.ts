import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
// import { MealS } from '../../../service/process/process.service'
import { environment } from '../../../../environments/environment';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { function_ } from '../../../components/function/function';
import { MealService } from '../../../service/setting/meal/setting.service';
import { NotificationComponent } from '../../../components/notification/notification.component';
import { PopupComponent } from '../../../components/popup/popup.component';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';


export interface Timedetail {
  _id: string;
  timedetailcode: string;
  timecode: string;
  __v: number;
  timedetailEN: string;
  timedetailTH: string;
  timedose: number;
  dayofweek: string;
}

export interface Meal {
  _id: string;
  timecode: string;
  __v: number;
  timeEN: string | null;
  timeFreq: string | null;
  timeTH: string;
  timecount: number | null;
  timetype: string | null;
  dateupdate: string;
  timedetail: Timedetail[];
  id: string;
}



@Component({
  selector: 'app-managemeal',
  standalone: false,

  templateUrl: './managemeal.component.html',
  styleUrl: './managemeal.component.scss'
})
export class ManagemealComponent implements AfterViewInit {
  private destroy$ = new Subject<void>();
  private mealCache: Meal[] | null = null;

  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  dataSourceMeal: MatTableDataSource<Meal> = new MatTableDataSource<Meal>();
  dataSourceTimedetail: MatTableDataSource<Timedetail> = new MatTableDataSource<Timedetail>();
  currentPageSize = 10;
  loading = false;
  selectedRow: Meal | null = null;
  selectedRowTimedetail: Timedetail | null = null;
  resData: any;

  displayedColumnsMeal: string[] = [
    'timecode',
    'timeEN',
    'timeTH',
    'timecount',
    'timetype',
    'actions',
  ];

  displayedColumnsTimedetail: string[] = [
    'timedetailcode',
    'timedetailEN',
    'timedetailTH',
    'timedose',
    'dayofweek',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private mealService: MealService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private function_: function_,
    private breakpointObserver: BreakpointObserver

  ) {
    this.initialLoad();
  }

  ngAfterViewInit() {
    this.setPaginatorAndSort();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initialLoad() {
    this.loading = true;
    this.cdr.markForCheck();

    this.mealService.getMeal(null).pipe(
      take(1)
    ).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.mealCache = response.data;
          this.updateDataSource(response.data);
        }
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Load Failed:', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getMeal(forceRefresh = false) {
    if (this.mealCache && !forceRefresh) {
      this.resData = this.mealCache;
      this.updateDataSource(this.resData);
      return;
    }

    this.loading = true;
    this.cdr.markForCheck();

    this.mealService.getMeal(null).pipe(
      take(1)
    ).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.mealCache = response.data;
          this.resData = response.data;
          this.updateDataSource(this.resData);

          if (this.selectedRow) {
            const preservedRow = this.resData.find((r: Meal) => r._id === this.selectedRow?._id);
            if (preservedRow) {
              this.selectedRow = preservedRow;
              this.dataSourceTimedetail = new MatTableDataSource(preservedRow.timedetail);
              this.setTimedetailPaginatorAndSort();
            }
          }
        }
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Load Failed:', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  private updateDataSource(data: Meal[]) {
    this.dataSourceMeal = new MatTableDataSource(data);
    this.setPaginatorAndSort();
  }

  private setPaginatorAndSort() {
    setTimeout(() => {
      if (this.paginator && this.sort) {
        this.dataSourceMeal.paginator = this.paginator;
        this.dataSourceMeal.sort = this.sort;
      }
      this.cdr.markForCheck();
    });
  }

  private setTimedetailPaginatorAndSort() {
    setTimeout(() => {
      if (this.paginator && this.sort) {
        this.dataSourceTimedetail.paginator = this.paginator;
        this.dataSourceTimedetail.sort = this.sort;
      }
      this.cdr.markForCheck();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMeal.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMeal.paginator) {
      this.dataSourceMeal.paginator.firstPage();
    }
  }

  shouldPreventRowClick(event: MouseEvent): boolean {
    const target = event.target as HTMLElement;
    return !!target.closest('.mat-column-actions') ||
      !!target.closest('button') ||
      !!target.closest('mat-icon');
  }

  onRowClicked(row: Meal, event?: MouseEvent) {
    if (!event || !this.shouldPreventRowClick(event)) {
      if (this.paginator) {
        this.currentPageSize = this.paginator.pageSize;
      }

      if (this.selectedRow === row) {
        return;
      }

      this.selectedRow = row;

      if (row.timedetail && row.timedetail.length > 0) {
        this.dataSourceTimedetail = new MatTableDataSource(row.timedetail);
        this.setTimedetailPaginatorAndSort();
      } else {
        this.dataSourceTimedetail = new MatTableDataSource(row.timedetail);
      }

      this.cdr.markForCheck();
    }
  }

  backToMealTypes() {
    this.selectedRow = null;
    // Restore paginator settings
    setTimeout(() => {
      if (this.paginator) {
        this.dataSourceMeal.paginator = this.paginator;
        this.paginator.pageSize = this.currentPageSize;
        this.paginator.firstPage();
      }
      this.cdr.markForCheck();
    });
  }

  // Add/Edit Methods
  addNewRow2() {
    if (!this.selectedRow) return;

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
        title: 'Add Time Detail',
        apiUrl: `${this.apiUrl}/master/mstimedetail/update`,
        fields: [
          { key: 'timecode', label: 'Code', value: this.selectedRow.timecode, type: 'string', disabled: true },
          { key: 'timedetailcode', label: 'Time', placeholder: 'Ex. 0800', type: 'string' },
          { key: 'timedetailEN', label: 'Description EN', placeholder: 'English description', type: 'string' },
          { key: 'timedetailTH', label: 'Description TH', placeholder: 'Thai description', type: 'string' },
          { key: 'timedose', label: 'Dose Time', placeholder: 'Dose time', type: 'number' },
          { key: 'dayofweek', label: 'dayofweek', placeholder: 'dayofweek', type: 'autocomplete' },
        ],
        options: {
          dayofweek: [{
            value: '0',
            label: 'วันอาทิตย์',
          }, {
            value: '1',
            label: 'วันจันทร์',
          }, {
            value: '2',
            label: 'วันอังคาร',
          }, {
            value: '3',
            label: 'วันพุธ',
          }, {
            value: '4',
            label: 'วันพฤหัสบดี',
          }, {
            value: '5',
            label: 'วันศุกร์',
          }, {
            value: '6',
            label: 'วันเสาร์',
          }],
        },
        useLabel: {
          dayofweek: false,
        },
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Received Data:', result);
        await this.initialLoad();
        const updaterow = this.addToSelectedRowDetail(result);
      } else {
        // console.log('Dialog closed without data');
      }
    });
  }

  editMstimedetail(row: Timedetail) {
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
        title: 'Edit Time Detail',
        apiUrl: `${this.apiUrl}/master/mstimedetail/update`,
        fields: [
          { key: '_id', label: 'ID', value: row._id, type: 'string', disabled: true, hidden: false },
          { key: 'timecode', label: 'Code', value: row.timecode, type: 'string', disabled: true },
          { key: 'timedetailcode', label: 'Time', value: row.timedetailcode, type: 'string' },
          { key: 'timedetailEN', label: 'Description EN', value: row.timedetailEN, type: 'string' },
          { key: 'timedetailTH', label: 'Description TH', value: row.timedetailTH, type: 'string' },
          { key: 'timedose', label: 'Dose Time', value: row.timedose, type: 'number' },
          { key: 'dayofweek', label: 'dayofweek', value: { value: row.dayofweek }, type: 'autocomplete' },
        ],
        options: {
          dayofweek: [{
            value: '0',
            label: 'วันอาทิตย์',
          }, {
            value: '1',
            label: 'วันจันทร์',
          }, {
            value: '2',
            label: 'วันอังคาร',
          }, {
            value: '3',
            label: 'วันพุธ',
          }, {
            value: '4',
            label: 'วันพฤหัสบดี',
          }, {
            value: '5',
            label: 'วันศุกร์',
          }, {
            value: '6',
            label: 'วันเสาร์',
          }],
        },
        useLabel: {
          dayofweek: false,
        },
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Received Data:', result);
        await this.initialLoad();
        // this.selectedRow?.timedetail = result;
        const updaterow = this.updateSelectedRowDetail(result);
        // console.log('Updated Row:', updaterow);
        // this.onRowClicked(updaterow);
      } else {
        // console.log('Dialog closed without data');
      }
    });
  }

  updateSelectedRowDetail(updaterow: any) {
    if (!this.selectedRow) return;

    this.selectedRow.timedetail = this.selectedRow.timedetail.map(item => {
      return item._id === updaterow._id ? { ...item, ...updaterow } : item;
    });

    this.refreshTimedetailDataSource();
  }

  /**
   * เพิ่มข้อมูลใหม่ลงใน selectedRow.timedetail
   */
  addToSelectedRowDetail(newDetail: any) {
    if (!this.selectedRow) return;

    this.selectedRow.timedetail = [...this.selectedRow.timedetail, newDetail];
    this.refreshTimedetailDataSource();
  }

  /**
   * ลบข้อมูลออกจาก selectedRow.timedetail
   */
  removeFromSelectedRowDetail(detailId: string) {
    if (!this.selectedRow) return;

    this.selectedRow.timedetail = this.selectedRow.timedetail.filter(
      item => item._id !== detailId
    );

    this.refreshTimedetailDataSource();
  }

  private refreshTimedetailDataSource() {
    if (!this.selectedRow) return;

    this.dataSourceTimedetail = new MatTableDataSource(this.selectedRow.timedetail);
    this.setTimedetailPaginatorAndSort();
    this.cdr.markForCheck();
  }

  /**
   * ตั้งค่า paginator และ sort สำหรับ timedetail
   */
  // Removed duplicate implementation of setTimedetailPaginatorAndSort

  deleteMstimedetail(row: Timedetail) {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '25%',
      data: {
        title: 'Delete Time Detail',
        message: 'Are you sure you want to delete this time detail?'
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
      filter(result => !!result)
    ).subscribe(() => {
      this.mealService.deleteTimedetail(row).pipe(
        take(1)
      ).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.toastr.success(response.data, 'Notification');
            this.removeFromSelectedRowDetail(row._id); // Remove from selected row
            this.getMeal(true); // Force refresh
          }
        },
        error: (err) => {
          this.toastr.warning(err, 'Notification', {
            toastClass: 'custom-toast-warning',
          });
        },
      });
    });
  }

  newMstime() {
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
        title: 'New Meal Type',
        apiUrl: `${this.apiUrl}/master/mstime/update`,
        fields: [
          { key: 'timecode', label: 'Code', placeholder: 'Code', type: 'string' },
          { key: 'timeEN', label: 'English Name', placeholder: 'English name', type: 'string' },
          { key: 'timeTH', label: 'Thai Name', placeholder: 'Thai name', type: 'string' },
          { key: 'timecount', label: 'Count/Day', placeholder: 'Count per day', type: 'number' },
          { key: 'timeFreq', label: 'Frequency', placeholder: 'Frequency', type: 'string', hidden: false },
          { key: 'timetype', label: 'timetype', placeholder: 'timetype', type: 'autocomplete', },
        ],
        options: {
          timetype: [{
            value: '0',
            label: 'ปกติ',
          }, {
            value: '1',
            label: 'PRN',
          }, {
            value: '2',
            label: 'ทุกๆ ตามเวลา',
          }, {
            value: '3',
            label: 'Multidose',
          }, {
            value: '4',
            label: 'กำหนดตามมื้อ',
          }],
        },
        useLabel: {
          timetype: false,
        },
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Received Data:', result);
        this.initialLoad();
      } else {
        // console.log('Dialog closed without data');
      }
    });
  }

  editMstime(row: Meal) {
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
        title: 'Edit Meal Type',
        apiUrl: `${this.apiUrl}/master/mstime/update`,
        fields: [
          { key: '_id', label: 'ID', value: row._id, type: 'string', disabled: true, hidden: false },
          { key: 'timecode', label: 'Code', value: row.timecode, type: 'string' },
          { key: 'timeEN', label: 'English Name', value: row.timeEN, type: 'string' },
          { key: 'timeTH', label: 'Thai Name', value: row.timeTH, type: 'string' },
          { key: 'timecount', label: 'Count/Day', value: row.timecount, type: 'number' },
          { key: 'timeFreq', label: 'Frequency', value: row.timeFreq, type: 'string', hidden: false },
          { key: 'timetype', label: 'Type', value: { value: row.timetype }, type: 'autocomplete' },
        ],
        options: {
          timetype: [{
            value: '0',
            label: 'ปกติ',
          }, {
            value: '1',
            label: 'PRN',
          }, {
            value: '2',
            label: 'ทุกๆ ตามเวลา',
          }, {
            value: '3',
            label: 'Multidose',
          }, {
            value: '4',
            label: 'กำหนดตามมื้อ',
          }],
        },
        useLabel: {
          timetype: false,
        },
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Received Data:', result);
        this.initialLoad();
      } else {
        // console.log('Dialog closed without data');
      }
    });
  }

  deleteMstime(row: Meal) {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '25%',
      data: {
        title: 'Delete Meal Type',
        message: 'Are you sure you want to delete this meal type?'
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
      filter(result => !!result)
    ).subscribe(() => {
      this.mealService.deleteMeal(row).pipe(
        take(1)
      ).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.toastr.success(response.data, 'Notification');
            this.getMeal(true); // Force refresh
          }
        },
        error: (err) => {
          this.toastr.warning(err, 'Notification', {
            toastClass: 'custom-toast-warning',
          });
        },
      });
    });
  }

  formatTime(value: string): string {
    if (!value || value.length !== 4) return value;
    return `${value.substring(0, 2)}:${value.substring(2, 4)}`;
  }


  getCheckTimeType(checkYesValue: string): string {
    switch (checkYesValue) {
      case '0': return 'ปกติ';
      case '1': return 'PRN';
      case '2': return 'ทุกๆ ตามเวลา';
      case '3': return 'multidose';
      case '4': return 'กำหนดตามมื้อ';
      default: return 'ไม่ระบุ';
    }
  }

  getCheckDayOfWeek(checkYesValue: string): string {
    switch (checkYesValue) {
      case '0': return 'วันอาทิตย์';
      case '1': return 'วันจันทร์';
      case '2': return 'วันอังคาร';
      case '3': return 'วันพุธ';
      case '4': return 'วันพฤหัสบดี';
      case '5': return 'วันศุกร์';
      case '6': return 'วันเสาร์';
      default: return 'ไม่ระบุ';
    }
  }
}

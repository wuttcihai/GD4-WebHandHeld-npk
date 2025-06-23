import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, signal, Renderer2, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
// import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { environment } from '../../../../environments/environment';
import { ReportService } from '../../../service/report/report.service';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { function_ } from '../../../components/function/function';
import html2canvas from 'html2canvas';


const today = new Date(); // ดึงวันที่ปัจจุบัน
const year = today.getFullYear(); // ดึงปีปัจจุบัน
const month = today.getMonth(); // ดึงเดือนปัจจุบัน (0-11)
const day = today.getDate(); // ดึงวันปัจจุบัน

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface RptWorkLoad {
  jobid: string;
  jobname?: string;
  prescription_count?: number;
  item_count?: number;
  category_code?: string;
  category_desc?: string;
}

@Component({
  selector: 'app-workload',
  standalone: false,

  templateUrl: './workload.component.html',
  styleUrl: './workload.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' }, // ตั้งค่า locale เป็นไทย
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }, // ใช้รูปแบบวันที่ใหม่
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class WorkloadComponent implements AfterViewInit, OnDestroy {
  // @HostListener('document:fullscreenchange', ['$event'])
  private fullscreenListener: (() => void) | undefined;

  form: FormGroup;
  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, day)),
    end: new FormControl(new Date(year, month, day)),
  });
  displayedColumns: string[] = [
    'jobid',
    'jobname',
    'prescription_count',
    'item_count',
    // 'category_code',
    'category_desc',
  ];
  stylengx_charts: string = '';
  styleFull: boolean = false;
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  dataSource: MatTableDataSource<RptWorkLoad> = new MatTableDataSource<RptWorkLoad>();
  hideMultipleSelectionIndicator = signal(false);
  errorMessage = '';
  resData: any | null = null;
  loading: boolean = false;
  hiddenSearch: boolean = false;
  hiddenChartDataS: boolean = false;
  hiddenChartDataP: boolean = false;
  hiddenChartDataD: boolean = false;
  toggleMultipleSelectionIndicator() {
    this.hideMultipleSelectionIndicator.update(value => !value);
  }
  chartDataS: any;
  chartDataP: any;
  chartDataD: any;


  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  constructor(
    private reportService: ReportService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private function_: function_,
    private renderer: Renderer2
  ) {
    this.form = this.fb.group({
      selectedOption: '3' // ตั้งค่าเริ่มต้นให้เลือก "รวม"
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

  onSearch() {
    // this.hiddenSearch = true
    this.stylengx_charts = "ngx-charts-bar-vertical-2d";
    this.loading = true;

    const startDate = new Date(this.campaignOne.value.start ?? new Date())
    const endDate = new Date(this.campaignOne.value.end ?? new Date());
    endDate.setDate(endDate.getDate() + 1);
    startDate.setDate(startDate.getDate() + 1);
    const endDatePlusOne = endDate.toISOString().split('T')[0];
    const startDatePlusOne = startDate.toISOString().split('T')[0];
    let starttime = "";
    let endtime = "";

    if (this.form.value.selectedOption === "1") {
      // console.log(this.form.value.selectedOption);
      starttime = "01:00:00";
      endtime = "08:59:59";

    } else if (this.form.value.selectedOption === "2") {
      starttime = "09:00:00";
      endtime = "17:59:59";
    } else {
      starttime = "01:00:00";
      endtime = "17:59:59";
    }


    // console.log(endDatePlusOne); 
    const dta = {
      startday: startDatePlusOne,
      endday: endDatePlusOne,
      starttime: starttime,
      endtime: endtime
    };
    this.reportService.getWorkload(dta).subscribe({
      next: (response) => {
        if (response.status == 200) {
          // console.log(response.data)
          if (response.data.length > 0) {
            this.toastr.success('Successful!', 'แจ้งเตือน');
            this.resData = response.data;
            this.chartDataS = this.resData
              .filter((category_code: any) => category_code.category_code == 'S')
              .map((user: { jobname: any; prescription_count: any; item_count: any; }) => ({
                name: user.jobname,
                series: [
                  { name: 'จำนวนใบสั่งยา', value: user.prescription_count },
                  { name: 'จำนวนรายการยา', value: user.item_count }
                ]
              }));
            this.chartDataD = this.resData
              .filter((category_code: any) => category_code.category_code == 'D')
              .map((user: { jobname: any; prescription_count: any; item_count: any; }) => ({
                name: user.jobname,
                series: [
                  { name: 'จำนวนใบสั่งยา', value: user.prescription_count },
                  { name: 'จำนวนรายการยา', value: user.item_count }
                ]
              }));
            this.chartDataP = this.resData
              .filter((category_code: any) => category_code.category_code == 'P')
              .map((user: { jobname: any; prescription_count: any; item_count: any; }) => ({
                name: user.jobname,
                series: [
                  { name: 'จำนวนใบสั่งยา', value: user.prescription_count },
                  { name: 'จำนวนรายการยา', value: user.item_count }
                ]
              }));

            this.chartDataS.length > 0 ? this.hiddenChartDataS = true : this.hiddenChartDataS = false
            this.chartDataD.length > 0 ? this.hiddenChartDataD = true : this.hiddenChartDataD = false
            this.chartDataP.length > 0 ? this.hiddenChartDataP = true : this.hiddenChartDataP = false
            this.dataSource = new MatTableDataSource(this.resData);
            this.hiddenSearch = true;
            this.loading = false;
            this.cdr.detectChanges();
            setTimeout(() => {
              if (this.paginator && this.sort) {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            });
          } else {
            this.toastr.warning('ไม่พบข้อมูล', 'แจ้งเตือน', {
              toastClass: 'custom-toast-warning',
            });
            this.loading = false;
            this.hiddenSearch = false
            this.cdr.detectChanges();
          }
        } else {
          this.toastr.warning(response.data, 'แจ้งเตือน', {
            toastClass: 'custom-toast-warning',
          });
          this.loading = false;
          this.hiddenSearch = false
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.loading = false;
        this.hiddenSearch = false
        this.cdr.detectChanges();
      },
    });

  }
  onExportToExcel() {
    const startDate = new Date(this.campaignOne.value.start ?? new Date())
    const endDate = new Date(this.campaignOne.value.end ?? new Date());
    endDate.setDate(endDate.getDate() + 1);
    startDate.setDate(startDate.getDate() + 1);
    const endDatePlusOne = endDate.toISOString().split('T')[0];
    const startDatePlusOne = startDate.toISOString().split('T')[0];
    this.function_.exportToExcel(this.resData, `รายงานภาระงานเจ้าหน้าที่ ${endDatePlusOne}TO${startDatePlusOne}`)
  }

  printDataSource() {
    const startDate = new Date(this.campaignOne.value.start ?? new Date())
    const endDate = new Date(this.campaignOne.value.end ?? new Date());
    endDate.setDate(endDate.getDate() + 1);
    startDate.setDate(startDate.getDate() + 1);
    const endDatePlusOne = endDate.toISOString().split('T')[0];
    const startDatePlusOne = startDate.toISOString().split('T')[0];
    this.function_.printDataSource(this.resData, `รายงานภาระงานเจ้าหน้าที่ ${endDatePlusOne}TO${startDatePlusOne}`)
  }

  /** พิมพ์กราฟ */
  printChart() {
    const printContents = this.chartContainer.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  /** ดาวน์โหลดกราฟเป็นรูปภาพ */
  downloadChart() {
    html2canvas(this.chartContainer.nativeElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'chart.png';
      link.click();
    });
  }

  /** ขยายเป็น Fullscreen */
  toggleFullscreen() {
    const elem = this.chartContainer.nativeElement;
    if (!document.fullscreenElement) {
      this.styleFull = true;
      elem.requestFullscreen();
      this.cdr.detectChanges();
    } else {
      this.styleFull = false;
      document.exitFullscreen();
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    this.fullscreenListener = this.renderer.listen('document', 'fullscreenchange', (event) => {
      if (!document.fullscreenElement) {
        this.styleFull = false;
        // console.log('Exited fullscreen mode');
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.fullscreenListener) {
      // this.styleFull =  false;
      this.fullscreenListener();
      this.cdr.detectChanges();
    }
  }


}

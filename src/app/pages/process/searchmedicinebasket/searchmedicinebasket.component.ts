import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ProcessService } from '../../../service/process/process.service'
import { environment } from '../../../../environments/environment';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { function_ } from '../../../components/function/function';
import { take } from 'rxjs';
export interface DrugAllergy {
  his: {
    allergycode: string;
    code: string;
    genericname: string;
    adverbs: string;
    memo: string;
    lastmodified: string;
  }[];
  hispharmacos: any[];
  ministries: any[];
  genorderdatetime: string;
}

export interface Drug {
  seq: string;
  orderitemcode: string;
  orderitemname: string;
  orderqty: string;
  orderunitcode: string;
  orderunitdesc: string;
  strength: string;
  strengthunit: string;
  instructioncode: string;
  instructiondesc: string;
  dosage: string;
  dosageunitcode: string;
  dosageunitdesc: string;
  frequencycode: string;
  frequencydesc: string;
  freetext1: string;
  freetext2: string;
  freetext3: string;
  freetext4: string;
  freetext5: string;
  price: string;
  precaution_advice_text: string;
  special_advice_text: string;
  refund: string;
  norefund: string;
  icsale: string;
  icrefund: string;
  icnorefund: string;
  store: string;
  _id: string;
}

export interface PackageMaster {
  _id: string;
  seqrun: number;
  _id_prescription: string;
  __v: number;
  dateupdate: string;
  drugaccountcode: string;
  edned: string;
  genorderdatetime: string;
  orderitembarcode: string;
  orderitemcode: string;
  orderitemname: string;
  orderqty: number;
  orderunitcode: string;
  orderunitdesc: string;
  poison: string;
  pregnancy: string;
  prescriptionno: string;
  prescriptionno_sup: string;
  seq: number;
  seqmax: number;
  shelfname: string;
  shelfzone: string;
  sortorder: number;
  basketno: string;
  lastpoint: string;
  zoneindt: string;
  zoneoutdt: string;
  zonechackdt: string;
  jobusername: string;
}


export interface rxOPD {
  _id: string;
  __v: number;
  appointmentdate: string;
  cid: string;
  computername: string;
  confirmdatetime: string;
  confirmuserid: string;
  doctorcode: string;
  doctorname: string;
  drugallergies: DrugAllergy[];
  drugs: Drug[];
  expressmed: string;
  hn: string;
  labs: any[];
  lastupdate: string;
  ordercreatedate: string;
  patientdob: string;
  patientname: string;
  pharmacyitemcode: string;
  pharmacyitemdesc: string;
  prescriptionno: string;
  qn: string;
  qrrdumix: string;
  rcvmedno: string;
  readdatetime: string;
  rightid: string;
  rightname: string;
  sex: string;
  sphmlct: string;
  sphmname: string;
  total_norefund: string;
  total_refund: string;
  totalprice: string;
  vn: string;
  voiddatetime: string | null;
  wardcode: string;
  wardname: string;
  firstzone: string;
  genorderdatetime: string;
  packagemaster: PackageMaster[];
}


interface OrderItem {
  orderitemcode: string;
  orderitemname: string;
  orderqty: number;
  zoneindt: string;
  basketno: string;
  orderunitdesc: string;
  shelfzone: string;
  zoneoutdt: string;
  zonechackdt: string;
  jobusername: string;
}
@Component({
  selector: 'app-searchmedicinebasket',
  standalone: false,

  templateUrl: './searchmedicinebasket.component.html',
  styleUrl: './searchmedicinebasket.component.scss'
})
export class SearchmedicinebasketComponent implements AfterViewInit {
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  dataSource: MatTableDataSource<PackageMaster> = new MatTableDataSource<PackageMaster>();
  errorMessage = '';
  resData: any;
  loading: boolean = false;
  searchQuery: string = '';
  form: FormGroup;
  rawData: PackageMaster[] = [];
  hiddenSearch: boolean = false;
  groupedData: { basketno: string, lastpoint: string, dataSource: MatTableDataSource<PackageMaster> }[] = [];
  displayedColumns: string[] = ['orderitemcode',
    'orderitemname',
    'orderqty',
    'orderunitdesc',
    'shelfzone',
    'zoneindt',
    'zoneoutdt',
    'zonechackdt',
    'jobusername',
    'status'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  rxOPD: rxOPD[] | undefined;
  // form: FormGroup | undefined;
  dataSearch: rxOPD[] = [];
  public dispayedataSearch: rxOPD[] = [];
  constructor(
    private processService: ProcessService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private function_: function_
  ) {
    this.form = new FormGroup({
      prescriptionno: new FormControl(''),
      vn: new FormControl(''),
      hn: new FormControl(''),
      patientname: new FormControl(''),
      patientdob: new FormControl(''),
      sex: new FormControl('')
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
    if (this.loading) return;
    
    this.loading = true;
    const searchData = { search: this.searchQuery };
    // console.log('API Called with:', searchData); // ตรวจสอบใน console
  
    this.processService.getSearchMedicineBasket(searchData).pipe(
      take(1) 
    ).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response.status === 200) {
          this.dataSearch = response.data;
          this.initializeForm();
  
          if (this.dataSearch.length > 0) {
            this.handleSuccessResponse();
          } else {
            this.handleEmptyResponse();
          }
        } else {
          this.handleOtherStatus();
        }
        

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.hiddenSearch = false;
        this.toastr.warning(err, 'แจ้งเตือน', {
          toastClass: 'custom-toast-warning',
        });
        this.cdr.detectChanges();
      }
    });
  }
  
  private initializeForm() {
    this.form = this.fb.group({
      prescriptionno: [{ value: '', disabled: true }],
      vn: [{ value: '', disabled: true }],
      hn: [{ value: '', disabled: true }],
      patientdob: [{ value: '', disabled: true }],
      patientname: [{ value: '', disabled: true }],
      sex: [{ value: '', disabled: true }],
      basketno: [{ value: '', disabled: true }],
      lastpoint: [{ value: '', disabled: true }],
    });
  }
  
  private handleSuccessResponse() {
    this.toastr.success('Successful!', 'แจ้งเตือน');
    this.rawData = this.dataSearch[0].packagemaster;
    this.form.patchValue({
      prescriptionno: this.dataSearch[0].prescriptionno,
      vn: this.dataSearch[0].vn,
      hn: this.dataSearch[0].hn,
      patientdob: this.function_.calculateAge(this.dataSearch[0].patientdob),
      patientname: this.dataSearch[0].patientname,
      sex: this.dataSearch[0].sex,
    });
    this.groupData();
    this.hiddenSearch = true;
  }
  
  private handleEmptyResponse() {
    this.toastr.warning('ไม่พบข้อมูล', 'แจ้งเตือน', {
      toastClass: 'custom-toast-warning',
    });
    this.hiddenSearch = false;
  }
  
  private handleOtherStatus() {
    this.hiddenSearch = false;
  }
  groupData() {
    const grouped: Record<string, PackageMaster[]> = {};

    this.rawData.sort((a, b) => a.sortorder - b.sortorder);

    // console.log(this.rawData);

    this.rawData.forEach(item => {
      // const formattedTime = this.formatTime(item.genorderdatetime);
      const newItem: PackageMaster = {
        orderitemcode: item.orderitemcode,
        orderitemname: item.orderitemname,
        orderunitdesc: item.orderunitdesc,
        orderqty: item.orderqty,
        zoneindt: this.function_.convertToThaiTime(item.zoneindt),
        basketno: item.basketno,
        shelfzone: item.shelfzone,
        zoneoutdt: this.function_.convertToThaiTime(item.zoneoutdt),
        zonechackdt: this.function_.convertToThaiTime(item.zonechackdt),
        jobusername: item.jobusername,
        _id: '',
        seqrun: 0,
        _id_prescription: '',
        __v: 0,
        dateupdate: '',
        drugaccountcode: '',
        edned: '',
        genorderdatetime: '',
        orderitembarcode: '',
        orderunitcode: '',
        poison: '',
        pregnancy: '',
        prescriptionno: '',
        prescriptionno_sup: '',
        seq: 0,
        seqmax: 0,
        shelfname: '',
        sortorder: 0,
        lastpoint: item.lastpoint,
      };
      // const time = new Date(item.zoneindt);
      // item.zoneindt = time.toISOString().substring(11, 19); // Format to "HH:MM:SS"
      if (!grouped[item.basketno]) {
        grouped[item.basketno] = [];
      }
      grouped[item.basketno].push(newItem);
    });
    // console.log(grouped)
    // this.groupedData = Object.keys(grouped).map(basket => ({
    //   basketno: basket,
    //   lastpoint: basket,
    //   dataSource: new MatTableDataSource(grouped[basket])

    // }));

    this.groupedData = Object.keys(grouped).map(basket => {
      const items = grouped[basket];
      return {
        basketno: basket,
        lastpoint: items[items.length - 1]?.lastpoint || '',
        dataSource: new MatTableDataSource(items)
      };
    });


    // console.log(this.groupedData)
  }

// ในไฟล์ component.ts
getCompletedItems(group: any): number {
  if (!group || !group.dataSource || !group.dataSource.data) return 0;
  
  return group.dataSource.data.filter((item: any) => 
    item.zoneindt && item.zoneoutdt
  ).length;
}

// เมธอดตรวจสอบสถานะตะกร้า
isBasketReady(group: any): boolean {
  const totalItems = group.dataSource.data.length;
  const completedItems = this.getCompletedItems(group);
  return totalItems > 0 && completedItems === totalItems;
}
  onToggleChange() {

    // console.log(this.transformData(row));

    // this.settingService.updateGroupUser(this.transformData(row)).subscribe({
    //   next: (response) => {
    //     // console.log(response);

    //     if (response.status === 200) {
    //       this.toastr.success('Successful!', 'แจ้งเตือน');
    //       this.getGroupUser()
    //     } else {
    //       // this.loading = false;
    //     }
    //   },
    //   error: (err) => {
    //     // console.error('Update Failed:', err);
    //     this.toastr.warning(err, 'แจ้งเตือน', {
    //       toastClass: 'custom-toast-warning',
    //     });
    //   },
    // });
  }
}

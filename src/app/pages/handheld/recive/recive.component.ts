import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Renderer2,
  Directive,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';

// import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HandheldService } from '../../../service/handheld/handheld.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../../components/popup/popup.component';
import { PopupnodataComponent } from '../../../components/popup/popupnodata/popupnodata.component';
import { PopuprejectComponent } from '../../../components/popup/popupreject/popupreject.component';
import { PopuprectiveshelfdescComponent } from '../../../components/popup/popuprectiveshelfdesc/popuprectiveshelfdesc.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
// import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
import { ReciveMsgComponent } from '../recive-msg/recive-msg.component';
import { AuthService } from '../../../service/auth/auth.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { PopupmederrorComponent } from '../../../components/popup/popupmederror/popupmederror.component';

export interface SelectPopup {
  label: string;
  value: string;
}
dayjs.extend(utc);
dayjs.extend(timezone);
@Component({
  selector: 'app-recive',
  standalone: false,

  templateUrl: './recive.component.html',
  styleUrl: './recive.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideInDown', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate(
          '0.4s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('pulse', [
      transition(':enter', [
        animate(
          '1.5s ease-in-out',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.05)', offset: 0.3 }),
            style({ transform: 'scale(0.95)', offset: 0.6 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate(
          '0.4s 0.2s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('100ms', [
            animate(
              '0.3s ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(10px)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(5px)',
                  offset: 0.3,
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
    trigger('bounceIn', [
      transition(':enter', [
        animate(
          '0.5s ease-in',
          keyframes([
            style({ transform: 'scale(0.3)', opacity: 0, offset: 0 }),
            style({ transform: 'scale(1.1)', opacity: 1, offset: 0.5 }),
            style({ transform: 'scale(0.9)', offset: 0.7 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('bounceInUp', [
      transition(':enter', [
        style({ transform: 'translateY(40px)', opacity: 0 }),
        animate(
          '0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class ReciveComponent implements AfterViewInit {
  @ViewChild('medicationInput') medicationInput!: ElementRef<HTMLInputElement>;
  @ViewChild('medicationInput2')
  medicationInput2!: ElementRef<HTMLInputElement>;

  WARD: any = JSON.parse(localStorage.getItem('WARD') || '{}');

  devicesPopup: SelectPopup[] = [];
  hasScanned = false;
  scanTime = new Date();
  currentBarcode = '';
  currentBarcodeDrug: any = '';
  showScanFeedback = false;
  isMobile = false;
  patientadmits: any;
  hiddenSearch: boolean = false;
  hiddenRecive: boolean = false;
  currentTime = new Date();
  scanFocus: boolean = true;
  statusColor: string = '#4CAF50'; // Default status color (green)
  statusMessage: string = 'Ready to scan'; // Default status message
  scanSuccess: boolean = false; // Tracks scan success state
  scanMessage: string = ''; // Feedback message for scans
  // currentTime: Date = new Date(); // Current time for display
  groupedData: { [key: string]: any[] } = {};
  medications: any[] = [];
  mederror: any = [];
  mederrors: any = [];

  popupImageUrl = '';
  popupImageUrls: string[] = [];
  showPopup: boolean = false;
  shelfs: any;
  selectedDate: string = new Date().toISOString().substring(0, 10);
  resDataPatientadmitSel: any; // สมมุติว่าเป็น array ของผู้ป่วย
  filteredPatient: any = null;

  inputData: any = '';
  prescription: any = {};

  patient = {
    photoUrl: './Document/dist/img/avatar5.png',
    name: 'พี่หนึ่ง ตีหรี่',
    hn: 'HN-123456',
    an: 'AN-789012',
    room: 'ICU-3',
    bed: 'B-02',
    status: 'stable',
  };

  medications_ = [
    {
      name: 'Amoxicillin 500mg',
      date: 'Today, 08:00 AM',
      dosage: '1 tablet',
      instruction: 'After breakfast',
      confirmed: false,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s',
    },
    {
      name: 'Lisinopril 10mg',
      date: 'Today, 02:00 PM',
      dosage: '1 tablet',
      instruction: 'With a glass of water',
      confirmed: false,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s',
    },
    {
      name: 'Atorvastatin 20mg',
      date: 'Today, 08:00 PM',
      dosage: '1 tablet',
      instruction: 'After dinner',
      confirmed: false,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s',
    },
    {
      name: 'Metformin 850mg',
      date: 'Today, 08:00 AM',
      dosage: '1 tablet each',
      instruction: 'With meals',
      confirmed: false,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s',
    },
  ];
  // handheldService: any;
  resDataPatientadmit: any;
  resDataPatientadmit2: any[] = [];
  // resDataPatientadmitSel: any;
  resDatapostPrescription: any;
  timeFilter: string = 'all';
  filteredMedications: any[] = [];
  lenSticker: any;
  inputValue: any;
  lenPack: any;
  // loading: boolean;
  dataSource: any;

  selection: any[] = [];
  selectedIds: any[] = [];

  KEY: string = '';

  @ViewChild('barcodeRow', { static: false }) barcodeRowRef!: ElementRef;
  scannedBarcode: string = '';

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.currentBarcode = this.KEY.trim();
      this.KEY = '';
      if (this.hasScanned) {
        // this.dialog.open(PopupnodataComponent, {
        //   width: '400px',
        //   height: '250px',
        //   disableClose: true,
        //   panelClass: 'no-radius-dialog',
        //   data: { message: 'onScanDrung' + this.currentBarcode }
        // });

        this.onScanDrung(this.currentBarcode);
      } else {
        // this.dialog.open(PopupnodataComponent, {
        //   width: '400px',
        //   height: '250px',
        //   disableClose: true,
        //   panelClass: 'no-radius-dialog',
        //   data: { message: 'onClickPatient' }
        // });

        this.onClickPatient(this.currentBarcode);
      }

      this.KEY = '';
      this.currentBarcode = '';
      this.hasScanned = true;
    } else if (
      event.key !== 'Shift' &&
      event.key !== 'Unidentified' &&
      event.key.length === 1
    ) {
      this.KEY += event.key;
    }
  }
  onReceive() {
    console.log('รับยา:');
    // หรือส่ง API / อัปเดตสถานะได้ที่นี่
    this.dialog.open(PopupnodataComponent, {
      width: '400px',
      height: '250px',
      disableClose: true,
      panelClass: 'no-radius-dialog',
      data: { message: 'onClickPatient' },
    });
  }
  onDateChange() {
    if (this.selectedDate) {
      const selected = new Date(this.selectedDate);
      const pickupDate = new Date();

      const isSameDate =
        pickupDate.getFullYear() === selected.getFullYear() &&
        pickupDate.getMonth() === selected.getMonth() &&
        pickupDate.getDate() === selected.getDate();

      console.log('เลือกวันที่:', this.selectedDate);
      console.log('isSameDate:', isSameDate);

      // ทำงานอื่นต่อ เช่นเรียกฟังก์ชัน
      this.onScanAN2();
    } else {
      this.filteredPatient = null;
    }
  }
  onWaitingClick() {
    this.hiddenRecive = false;
    this.onScanAN2();
    console.log('รอรับยา clicked');
    // ใส่ logic ที่ต้องการที่นี่ เช่น กรองรายการ หรือเปลี่ยนสถานะ
  }

  onReceivedClick() {
    this.hiddenRecive = true;
    this.onScanAN2();
    console.log('รับยาแล้ว clicked');
    // ใส่ logic ที่ต้องการที่นี่ เช่น แสดงเฉพาะรายการที่รับยาแล้ว
  }
  openRejectPopupItem(row: any) {
    // console.log(row.prescriptionno);

    const thaiTime = dayjs().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');

    const dialogRef = this.dialog.open(PopuprejectComponent, {
      width: '600px',
      height: '400px',
      disableClose: true,
      panelClass: 'no-radius-dialog',
      data: this.selectedIds, // ถ้าต้องการส่งค่ามาก็ใส่ตรงนี้
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        this.selectedIds.push({
          _id: row._id,
          updatestatus: {
            reciveuserid: localStorage.getItem('usercode'),
            reciveusername: localStorage.getItem('username'),
            recivedatetime: thaiTime,
            recivestatus: 'R',
            reciveremark: 'ปฏิเสธรับยา ' + result?.remark,
          },
        });
        console.log(this.selectedIds);
        this.handheldService
          .updatepackage(this.selectedIds)
          .subscribe((response) => {
            let d = response;
            this.onClickPatient(row.prescriptionno);
            console.log(d);
          });
        // this.onClick(row.prescriptionno);
      } else {
        this.selectedIds = [];
        // console.log('ยกเลิก');
      }
    });
  }
  onPreDispensingError(row: any) {
    this.handheldService
      .postmeddicationerrorheader({ errortypecode: 'ERT003' })
      .subscribe((response) => {
        //console.log(response);
        this.mederror = response;
        console.log(this.mederror.data);
        this.mederrors = this.mederror.data.map((r: any) => ({
          value: r.errordetailcode,
          label: r.errordetail || 'Unknown', // ตั้งค่าเริ่มต้นถ้าไม่มีชื่อ
        }));

        // สร้าง array ใหม่จาก response ที่ได้
        //console.log(this.mederrors);
        const isMobile =
          this.breakpointObserver.isMatched('(max-width: 768px)');
        const dialogRef = this.dialog.open(PopupmederrorComponent, {
          maxWidth: 'none',
          maxHeight: 'none',
          width: isMobile ? '97%' : '60%',
          height: isMobile ? '80%' : 'auto',
          panelClass: 'custom-dialog-container',
          data: {
            title: 'Med Error',
            apiUrl: ``,
            fields: [
              // { key: 'ordercreatedate', label: 'วันที่', placeholder: 'วันที่', disabled: true, value: row.ordercreatedate, type: 'string', hidden: false },
              {
                key: '_id_prescription',
                label: 'idเลขที่ใบสั่งยา',
                placeholder: 'idเลขที่ใบสั่ง',
                disabled: true,
                value: row._id,
                type: 'string',
                hidden: false,
              },
              {
                key: 'prescriptionno',
                label: 'เลขที่ใบสั่งยา',
                placeholder: 'เลขที่ใบสั่ง',
                disabled: true,
                value: row.prescriptionno,
                type: 'string',
                hidden: true,
                id_prescription: row._id,
              },
              {
                key: 'hn',
                label: 'hn',
                placeholder: 'HN',
                disabled: true,
                value: row.hn,
                type: 'string',
                hidden: true,
              },
              {
                key: 'an',
                label: 'an',
                placeholder: 'AN',
                disabled: true,
                value: row.an,
                type: 'string',
                hidden: true,
              },
              {
                key: 'orderitemcode',
                label: 'รหัยา',
                placeholder: 'orderitemcode',
                disabled: true,
                value: row.orderitemcode,
                type: 'string',
                hidden: true,
              },
              {
                key: 'orderitemname',
                label: 'ชื่อยา',
                placeholder: 'orderitemname',
                disabled: true,
                value: row.orderitemname,
                type: 'string',
                hidden: true,
              },
              {
                key: 'orderunitdesc',
                label: 'หน่วย',
                placeholder: 'orderunitdesc',
                disabled: true,
                value: row.orderunitdesc,
                type: 'string',
                hidden: true,
              },
              {
                key: 'orderqty',
                label: 'จำนวนที่หมอสั่ง',
                placeholder: 'orderqty',
                disabled: true,
                value: row.orderqty,
                type: 'string',
                hidden: true,
              },
              // { key: 'shelfzone', label: 'ตำแหน่ง', placeholder: 'shelfzone', disabled: true, value: row.shelfzone, type: 'string', hidden: true },
              // { key: 'jobuserid', label: 'jobuserid', placeholder: 'jobuserid', disabled: true, value: row.jobusername, type: 'string', hidden: false },
              // { key: 'jobusername', label: 'ผู้จัดยา', placeholder: 'jobusername', disabled: true, value: row.jobusername, type: 'string', hidden: true },
              {
                key: 'mederror_desc',
                label: 'หัวข้อ',
                placeholder: 'หัวข้อ',
                disabled: false,
                value: row.mederror_desc,
                type: 'autocomplete',
                hidden: true,
              },
              {
                key: 'mederror_freetext',
                label: 'รายละเอียด',
                placeholder: 'รายละเอียด',
                disabled: false,
                value: row.mederror_freetext,
                type: 'string',
                hidden: true,
              },
              // { key: 'mederror_robot', label: 'เกิดจาก Robot', placeholder: 'เกิดจาก Robot', disabled: false, value: row.mederror_robot, type: 'autocomplete', hidden: true },
              // { key: 'mederror_userid', label: 'mederror_userid', placeholder: 'mederror_userid', disabled: false, value: row.mederror_userid ? row.mederror_userid : localStorage.getItem('username'), type: 'string', hidden: false },
              {
                key: 'mederror_username',
                label: 'ผู้บันทึก',
                placeholder: 'ผู้บันทึก',
                disabled: false,
                value: row.mederror_username
                  ? row.mederror_username
                  : localStorage.getItem('username'),
                type: 'string',
                hidden: false,
              },
              {
                key: 'mederror_type',
                label: 'mederror_type',
                placeholder: 'mederror_type',
                disabled: true,
                value: 'RECIVE',
                type: 'string',
                hidden: false,
              },
            ],
            options: {
              mederror_desc: this.mederrors,
            },
            useLabel: {
              mederror_desc: true,
            },
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result == 'confirm' && result !== undefined) {
            console.log(row.prescriptionno);
            this.onClickPatient(row.prescriptionno);
            //  this.onClick(row.prescriptionno);
          } else {
          }
        });
      });
  }
  onclickoffdrug(row: any) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      const thaiTime = dayjs().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
      // console.log(row);
      const rows = Array.isArray(row) ? row : [row];
      this.selectedIds = [];

      if (this.selectedIds.length == 0) {
        rows.forEach((r) => {
          this.selectedIds.push({
            _id: r._id,
            updatestatus: {
              voiduserid: localStorage.getItem('usercode'),
              voidusername: localStorage.getItem('username'),
              voiddatetime: thaiTime,
            },
          });
        });
        console.log(this.selectedIds);

        this.handheldService
          .updatepackage(this.selectedIds)
          .subscribe((response) => {
            let d = response;
            this.onClickPatient(row.prescriptionno);
            // console.log(d);
          });
        // this.hiddenSearch = false;
        // console.log(row.prescriptionno)
      }
    }
  }
  onclickholddrug(row: any) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      const thaiTime = dayjs().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
      // console.log(row);
      const rows = Array.isArray(row) ? row : [row];
      this.selectedIds = [];

      if (this.selectedIds.length == 0) {
        rows.forEach((r) => {
          this.selectedIds.push({
            _id: r._id,
            updatestatus: {
              holduserid: localStorage.getItem('usercode'),
              holdusername: localStorage.getItem('username'),
              holddatetime: thaiTime,
            },
          });
        });
        // console.log(this.selectedIds)
        // const dialogRef = this.dialog.open(PopupnodataComponent, {
        //   width: '400px',
        //   height: '350px',
        //   disableClose: true,
        //   panelClass: 'no-radius-dialog',
        //   data: { message: 'คุณต้องการ off ยา' }

        // });
        // } else {
        this.handheldService
          .updatepackage(this.selectedIds)
          .subscribe((response) => {
            let d = response;
            this.onClickPatient(row.prescriptionno);
            console.log(d);
          });

        //  console.log(row.prescriptionno)
      }
    }
  }
  scannedValue: string = '';
  lastBarcode: string = '';
  scanTimeout: any;
  @ViewChild('scannerInput') scannerInput!: ElementRef;
  @ViewChild('BarcodeDrug') BarcodeDrug!: ElementRef;
  ngAfterViewInit() {
    // this.scannerInput.nativeElement.focus();
  }

  onBarcodeInput(event: any) {
    const barcode = event.target.value;
    console.log('Scanned barcode:', barcode);

    this.onClickPatient(barcode);
    event.target.value = ''; // clear input
  }

  @ViewChild('barcodeInputBox') barcodeInputBox!: ElementRef;
  barcodeInput: string = '';

  ngOnInit() {
    // Simulate loading data
    this.onScanAN2();
    this.showshelf();

    // this.openFullscreen()
    setTimeout(() => {
      this.patient.status = 'stable';
    }, 1500);
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private handheldService: HandheldService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    // this.checkIfMobile();
  }

  // ngAfterViewInit() {
  //   this.focusInput();
  // }

  checkIfMobile() {
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  }

  onInputFocus() {
    // this.currentBarcode = '';
    // if (this.isMobile) {
    //   this.renderer.addClass(document.body, 'keyboard-open');
    // }
  }

  onInputBlur() {
    if (this.isMobile) {
      this.renderer.removeClass(document.body, 'keyboard-open');
    }
  }

  focusInput() {
    setTimeout(() => {
      //this.scannerInput.nativeElement.focus();
      //(document.activeElement as HTMLElement)?.blur();
      // this.medicationInput.nativeElement.focus();
      // Force keyboard to open on mobile
      // if (this.isMobile) {
      //   this.scannerInput.nativeElement.click();
      //   this.scannerInput.nativeElement.setAttribute('inputmode', 'search');
      // }
    }, 100);
  }

  focusInput2() {
    setTimeout(() => {
      //this.BarcodeDrug.nativeElement.focus();
      // // Force keyboard to open on mobile
      // if (this.isMobile) {
      //   this.BarcodeDrug.nativeElement.click();
      //   this.medicationInput2.nativeElement.setAttribute('inputmode', 'search');
      // }
    }, 100);
  }

  blurInput() {
    if (this.isMobile) {
      //this.medicationInput.nativeElement.blur();
    }
  }

  processBarcode(barcode: string) {
    if (!barcode || barcode.trim() === '') return;

    const newMed = this.fetchMedicationData(barcode);
    // console.log(this.medications)
    if (!this.medications.some((m) => m.barcode === barcode)) {
      this.medications.unshift(newMed);
      this.hasScanned = true;
      this.scanTime = new Date();
      this.showScanFeedback = true;
      this.currentBarcode = '';
      this.medications = this.medications[0];
      // console.log(this.medications[0])
      setTimeout(() => {
        this.showScanFeedback = false;
        if (this.isMobile) {
          this.blurInput(); // Hide keyboard after submission on mobile
        } else {
          this.focusInput(); // Keep focus on desktop
        }
      }, 2000);
    }
  }

  fetchMedicationData(barcode: string): any {
    // type = 'normal','overtime' ,'HAD'
    const medTypes = [
      {
        name: 'Paracetamol 500mg',
        imageUrl: 'assets/paracetamol.png',
        quantity: 1,
        unit: 'เม็ด',
        instructions: 'หลังอาหารเย็น',
        type: 'HAD',
        time: '2025-04-24 22:00',
        barcode: '1234',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s',
      },
      {
        name: 'Amoxicillin 250mg',
        imageUrl: 'assets/amoxicillin.png',
        quantity: 21,
        unit: 'capsules',
        instructions: 'หลังอาหารเย็น',
        time: '2025-04-24 22:00',
        type: 'normal',
        barcode: '1234',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s',
      },
      {
        name: 'Atorvastatin 20mg',
        imageUrl: 'assets/atorvastatin.png',
        quantity: 30,
        unit: 'tablets',
        instructions: 'หลังอาหารเย็น',
        time: '2025-04-24 22:00',
        type: 'overtime',
        barcode: '1234',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s',
      },
    ];

    // const index = Math.abs(this.hashCode(barcode)) % medTypes.length;
    // return medTypes[index];
    return medTypes.filter((item) => String(item.barcode) === String(barcode));
  }

  hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  removeMedication(index: number) {
    this.medications.splice(index, 1);
    if (this.medications.length === 0) {
      this.hasScanned = false;
    }
    this.focusInput();
  }

  clearAll() {
    this.medications = [];
    this.hasScanned = false;
    this.focusInput();
  }

  onConfirm(Option: string) {
    // type = 'normal','overtime' ,'HAD'
    switch (Option) {
      case 'overtime':
        this.confirmDispenseError();
        break;
      case 'normal':
        this.confirmDispense();
        break;

      case 'HAD':
        this.confirmDispenseHAD();
        break;
        // case 3:
        //   // console.log("Zone 3 จ่าย");
        //   result = await checkZone3(conveyor_ip, rfid_data);
        // result = await cvy.checkZone3(conveyor_ip, rfid_data);
        break;
      default:
      // console.log(`Sorry, we are out of `, conveyor_ip);
    }
  }
  // openFullscreen() {
  //   const elem = document.documentElement;

  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if ((elem as any).webkitRequestFullscreen) {
  //     /* Safari */
  //     (elem as any).webkitRequestFullscreen();
  //   } else if ((elem as any).msRequestFullscreen) {
  //     /* IE11 */
  //     (elem as any).msRequestFullscreen();
  //   }
  // }
  confirmDispense() {
    if (this.medications.length === 0) return;

    const medNames = this.medications.map((m) => m.name).join(', ');
    alert(`Dispensed ${this.medications.length} medications: ${medNames}`);
    this.clearAll();
  }

  confirmDispenseError() {
    this.dialog.closeAll();
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    const dialogRef = this.dialog.open(PopupComponent, {
      maxWidth: 'none',
      maxHeight: 'none',
      width: isMobile ? '95%' : '40%',
      height: isMobile ? '50%' : 'auto',
      hasBackdrop: true,
      backdropClass: 'custom-blur-backdrop',
      panelClass: 'custom-dialog-container',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'เหตุผลการให้ยาเกินเวลา',
        apiUrl: ``,
        fields: [
          {
            key: 'deviceCode',
            label: 'เลือกเหตุผล',
            placeholder: 'Enter device code',
            type: 'autocomplete',
          },
          {
            key: 'deviceName',
            label: 'เหตุผลการให้ยา',
            placeholder: 'Enter device name',
            type: 'string',
          },
          // { key: 'deviceDesc', label: 'Device Desc', placeholder: 'Enter device desc', type: 'string' },
          // { key: 'deviceIP', label: 'Device IP', placeholder: 'Enter device ip', type: 'string' },
          // { key: 'computerName', label: 'Computer Name', placeholder: 'Enter computer name', type: 'string' },
          // { key: 'pharmacyCode', label: 'Pharmacy Code', placeholder: 'Enter pharmacy code', type: 'string' },
          // { key: 'sortOrder', label: 'sortOrder', placeholder: 'Enter sortOrder', type: 'number' },
          // { key: 'orderzone', label: 'orderzone', placeholder: 'Enter orderzone', value:0, type: 'number' },
          // { key: 'isEnabled', label: 'isEnabled', placeholder: 'Enter isEnabled', value: false, type: 'boolean' },
        ],
        options: {
          deviceCode: [
            {
              label: 'TEST 1',
              value: 'TEST 1',
            },
            {
              label: 'TEST 2',
              value: 'TEST 2',
            },
            {
              label: 'TEST 3',
              value: 'TEST 3',
            },
          ],
        },
        useLabel: {
          deviceCode: true,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'Close' && result !== undefined) {
        this.toastr.success('Successful!', 'แจ้งเตือน');
        this.resDataPatientadmit = [];
        this.resDatapostPrescription = [];
        this.hasScanned = false;
        this.focusInput();
        this.currentBarcode = '';
      } else {
        // this.toastr.success('Successful!', 'แจ้งเตือน');
        // this.resDataPatientadmit = [];
        // this.resDatapostPrescription = [];
        // this.hasScanned = false;
        // this.focusInput();
        // this.currentBarcode = '';
      }
    });
  }

  confirmDispenseHAD() {
    this.dialog.closeAll();
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    const dialogRef = this.dialog.open(PopupComponent, {
      maxWidth: 'none',
      maxHeight: 'none',
      width: isMobile ? '95%' : '40%',
      height: isMobile ? '60%' : 'auto',
      hasBackdrop: true,
      backdropClass: 'custom-blur-backdrop',
      panelClass: 'custom-dialog-container',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'เหตุผลการให้ยาเกินเวลา',
        apiUrl: ``,
        fields: [
          {
            key: 'username',
            label: 'Username',
            placeholder: 'Username',
            type: 'string',
          },
          {
            key: 'password',
            label: 'Password',
            placeholder: 'Password',
            type: 'string',
          },
          // { key: 'deviceDesc', label: 'Device Desc', placeholder: 'Enter device desc', type: 'string' },
          // { key: 'deviceIP', label: 'Device IP', placeholder: 'Enter device ip', type: 'string' },
          // { key: 'computerName', label: 'Computer Name', placeholder: 'Enter computer name', type: 'string' },
          // { key: 'pharmacyCode', label: 'Pharmacy Code', placeholder: 'Enter pharmacy code', type: 'string' },
          // { key: 'sortOrder', label: 'sortOrder', placeholder: 'Enter sortOrder', type: 'number' },
          // { key: 'orderzone', label: 'orderzone', placeholder: 'Enter orderzone', value:0, type: 'number' },
          // { key: 'isEnabled', label: 'isEnabled', placeholder: 'Enter isEnabled', value: false, type: 'boolean' },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'Close' && result !== undefined) {
        // console.log('Received Data:', result);
        // this.getDevice()
      } else {
        // console.log('Dialog closed without data');
      }
    });
  }

  styleType(medType: string) {
    const styles: any = {};

    if (medType === 'overtime') {
      styles.color = 'red';
      styles.paddingTop = '1rem';
      styles.marginBottom = '-1.3rem';
    }

    if (medType === 'HAD') {
      styles.color = 'red';
      styles.paddingTop = '1rem';
      styles.marginBottom = '-1.3rem';
    }
    // You can add more conditions here if needed

    return styles;
  }

  confirmDose(medication: any) {
    medication.confirmed = !medication.confirmed;

    // Add some visual feedback
    if (medication.confirmed) {
      // Could add a service call here to update backend
    }
  }

  showMedicationHistory() {
    // Would implement navigation to history view
    // console.log('Show medication history');
    this.resDataPatientadmit = [];
    this.resDatapostPrescription = [];
    this.hasScanned = false;
    this.focusInput();
    // this.currentBarcode = '';
  }

  confirmAllMedications() {
    // Confirm all unconfirmed medications
    this.medications.forEach((med) => {
      if (!med.confirmed) {
        med.confirmed = true;
        // Add any additional confirmation logic here
      }
    });

    // Show confirmation feedback
    this.showConfirmationToast();
  }

  async showConfirmationToast() {
    // const timeOver = this.resDatapostPrescription.filter((item: { frequencytime: string; }) => this.isTimeOver(item.frequencytime) == true).length;
    // const HAD = this.resDatapostPrescription.filter((item: { highalert: string; }) => item.highalert == '1').length;
    const userCheck = this.resDatapostPrescription.filter(
      (item: { recivedatetime: string }) => !item.recivedatetime
    ).length;

    // console.log(this.resDatapostPrescription);
    if (userCheck > 0) {
      this.toastr.warning('กรุณาแสกนซองยาให้ครบ', 'แจ้งเตือน', {
        toastClass: 'custom-toast-warning',
      });
      // this.confirmDispenseError();
    } else {
      const ref = await this.showLoginBeforeConfirm();
      ref.afterClosed().subscribe(async (result) => {
        this.toastr.show(result.fullname, 'แจ้งเตือน', {
          toastClass: 'custom-toast-warning',
        });
        if (result !== 'Close' && result !== undefined) {
          let resDataz = this.resDatapostPrescription.map(
            (item: {
              _id: any;
              reciveuserid: any;
              reciveusername: any;
              recivedatetime: any;
              recivestatus: any;
              reciveremark: any;
            }) => ({
              _id: item._id,
              updatestatus: {
                recivestatus: 'A',
                reciveremark: 'ยาที่ได้รับการตรวจสอบแล้ว',
                reciveuserid: result,
                reciveusername: result,
                recivedatetime: new Date(),
              },
            })
          );

          // console.log(resDataz)
          this.handheldService.updatepackage(resDataz).subscribe({
            next: (response) => {
              // console.log(response);

              if (response.status === 200) {
                this.toastr.success('บันทึกเรียบร้อย!', 'แจ้งเตือน');
                this.resDataPatientadmit = [];
                this.resDatapostPrescription = [];
                this.hasScanned = false;
                this.focusInput();
                this.currentBarcode = '';
                this.onScanAN2();
                // this.toastr.success('Successful!', 'แจ้งเตือน');
                // this.resDataPatientadmit2 = response.data
                // this.hasScanned = false;

                // console.log(response.data);
                // this.onpostprescription(an)
                // this.getDevice()
              } else {
                // this.loading = false;
              }
            },
            error: (err) => {
              // console.error('Update Failed:', err);
              // this.toastr.warning(err, 'แจ้งเตือน', {
              //   toastClass: 'custom-toast-warning',
              // });
            },
          });
        } else {
          // console.log('Dialog closed without data');
        }
      });

      // console.log(this.resDatapostPrescription)
    }

    // You might use a library like ngx-toastr or create a custom toast component
  }

  onScanAN2() {
    const selected = this.selectedDate
      ? new Date(this.selectedDate)
      : new Date();

    const startDate = new Date(selected);
    startDate.setHours(0, 0, 0, 0); // เริ่มต้นวัน 00:00

    const endDate = new Date(selected);
    endDate.setHours(23, 59, 59, 999); // สิ้นสุดวัน 23:59
    console.log(startDate.toISOString());
    console.log(endDate.toISOString());

    let recivedatetime: any;

    if (this.hiddenRecive) {
      recivedatetime = { $ne: null }; // ถ้าต้องการรายการที่ "รับยาแล้ว"
    } else {
      recivedatetime = null; // ถ้าต้องการรายการที่ "ยังไม่ได้รับยา"
    }

    const q = {
      wardcode: this.WARD.wardcode,
      recivedatetime: recivedatetime,
      voiddatetime: null,
      holddatetime: null,
      orderitembarcode: { $ne: null },
      checkoutdatetime: {
        $ne: null,
        $gte: startDate.toISOString(),
        $lte: endDate.toISOString(),
      },
    };
    //console.log(q);
    // const q = {
    //   wardcode: this.WARD.wardcode,
    //   recivedatetime: null,
    //   checkoutdatetime: { $ne: null },
    // };
    this.handheldService.postpatientadmit(q).subscribe({
      next: (response) => {
        // console.log(response);
        if (response.status === 200) {
          // this.toastr.success('Successful!', 'แจ้งเตือน');
          this.resDataPatientadmit2 = response.data;
          // Sort by activebed (assuming it's a string or number)
          this.resDataPatientadmit2 = response.data.sort((a: any, b: any) => {
            if (a.activebed < b.activebed) return -1;
            if (a.activebed > b.activebed) return 1;
            return 0;
          });
          this.hasScanned = false;

          //console.log(response.data);
          // this.onpostprescription(an)
          // this.getDevice()
        } else {
          // this.loading = false;
        }
      },
      error: (err) => {
        // console.error('Update Failed:', err);
        // this.toastr.warning(err, 'แจ้งเตือน', {
        //   toastClass: 'custom-toast-warning',
        // });
      },
    });
    this.currentBarcode = '';
  }

  // onScanAN(an: string) {
  //   this.handheldService.postpatientadmit({ wardcode: '1641' }).subscribe({
  //     next: (response) => {
  //       // console.log(response);

  //       if (response.status === 200) {
  //         // this.toastr.success('Successful!', 'แจ้งเตือน');
  //         this.resDataPatientadmit = response.data.find(
  //           (item: { an: string }) => item.an === an
  //         );
  //         this.hasScanned = true;
  //         this.onpostprescription(an);
  //         // this.getDevice()
  //       } else {
  //         // this.loading = false;
  //       }
  //     },
  //     error: (err) => {
  //       // console.error('Update Failed:', err);
  //       // this.toastr.warning(err, 'แจ้งเตือน', {
  //       //   toastClass: 'custom-toast-warning',
  //       // });
  //     },
  //   });
  //   this.currentBarcode = '';
  // }

  onClickPatient(prescriptionno: string) {
    //console.log(prescriptionno);
    this.currentBarcodeDrug = '';
    this.resDataPatientadmitSel = this.resDataPatientadmit2.find(
      (item: { prescriptionno: string }) =>
        item.prescriptionno === prescriptionno
    );
    this.handheldService
      .postpatientadmitpackage({
        prescriptionno: prescriptionno,
        recivedatetime: null,
        voiddatetime: null,
        holddatetime: null,
      })
      .subscribe({
        next: (response) => {
          // console.log(response);

          if (response.status === 200) {
            if (!response.data || response.data.length === 0) {
              this.toastr.warning(
                'ไม่พบข้อมูลใบสั่งยาสำหรับผู้ป่วยนี้',
                'แจ้งเตือน'
              );
              this.hasScanned = false;
              return; // ออกจากฟังก์ชัน ไม่ต้องทำอะไรต่อ
            }

            // console.log(response);
            this.resDatapostPrescription = response.data.sort(
              (
                a: { orderitembarcode: string },
                b: { orderitembarcode: any }
              ) => {
                return a.orderitembarcode.localeCompare(b.orderitembarcode);
              }
            );

            // this.lenPack == response.data.filter((item: { sendmachine: string; }) => item.sendmachine == "Y").length;

            // console.log(this.resDatapostPrescription.filter((item: { sendmachine: string; }) => item.sendmachine == "Y").length)
            // this.lenPack = this.resDatapostPrescription.filter((item: { sendmachine: string; }) => item.sendmachine == "Y")
            // this.lenSticker = this.resDatapostPrescription.filter((item: { sendmachine: string; }) => item.sendmachine == "N")
            const uniquePackBarcodes = new Set<string>();
            const uniqueStickerBarcodes = new Set<string>();

            this.resDatapostPrescription.forEach(
              (item: { sendmachine: string; orderitembarcode: string }) => {
                if (item.sendmachine == 'Y') {
                  uniquePackBarcodes.add(item.orderitembarcode);
                } else if (item.sendmachine == 'N') {
                  uniqueStickerBarcodes.add(item.orderitembarcode);
                }
              }
            );

            this.lenPack = uniquePackBarcodes.size;
            this.lenSticker = uniqueStickerBarcodes.size;

            // console.log(this.lenPack)

            this.groupedData = {};
            // groupData():a {/
            this.resDatapostPrescription.forEach(
              (item: { orderitembarcode: any }) => {
                const barcode = item.orderitembarcode;
                if (!this.groupedData[barcode]) {
                  this.groupedData[barcode] = [];
                }
                this.groupedData[barcode].push(item);
              }
            );

            // console.log(this.groupedData);
            // }
            // console.log(this.lenPack);
            // this.lenSticker == response.data.filter((item: { sendmachine: string; }) => item.sendmachine == "N").length;
            // this.toastr.success('Successful!', 'แจ้งเตือน');
            // this.resDataPatientadmit = response.data.find((item: { an: string; }) => item.an === an);
            this.focusInput2;
            this.timeFilter = 'all';
            this.updateFilteredMedications();
            this.hasScanned = true;

            // this.onpostprescription(an)
            // this.getDevice()
          } else {
            // this.loading = false;

            this.toastr.success('ไม่พบข้อมูล!', 'แจ้งเตือน');
          }
        },
        error: (err) => {
          // console.error('Update Failed:', err);
          // this.toastr.warning(err, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
        },
      });
  }

  onpostprescription(an: string) {
    this.handheldService.postprescription({ wardcode: '1641' }).subscribe({
      next: (response) => {
        // console.log(response);

        if (response.status === 200) {
          // this.toastr.success('Successful!', 'แจ้งเตือน');
          this.resDatapostPrescription = response.data.filter(
            (item: { an: string }) => item.an === an
          );
          this.formatfrequencytime();
          this.resDatapostPrescription = this.getNextDoses();
          // console.log(this.resDatapostPrescription);
          // this.resDatapostPrescription
          const options2 = ['N', 'L', 'R', 'W'];
          const randomString =
            options2[Math.floor(Math.random() * options2.length)];

          this.resDatapostPrescription.forEach(
            (items: { barcodevizen: string; usercheckDatetime: boolean }) => {
              const randomString =
                options2[Math.floor(Math.random() * options2.length)];
              (items.barcodevizen = `${randomString}1234`),
                (items.usercheckDatetime = false);
            }
          );
          this.hasScanned = true;
          // this.getDevice()
        } else {
          // this.loading = false;
        }
      },
      error: (err) => {
        // console.error('Update Failed:', err);
        // this.toastr.warning(err, 'แจ้งเตือน', {
        //   toastClass: 'custom-toast-warning',
        // });
      },
    });
  }

  // getNextDoses(): any[] {
  //   this.formatfrequencytime()
  //   const currentMinutes = this.currentTime.getHours() * 60 + this.currentTime.getMinutes();

  //   const futureDoses = this.resDatapostPrescription.filter((med: { frequencytime: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: NumberConstructor): [any, any]; new(): any; }; }; }; }) => {
  //     if (!med.frequencytime) return false;

  //     const [hours, minutes] = med.frequencytime.split(':').map(Number);
  //     const medMinutes = hours * 60 + minutes;

  //     return medMinutes >= currentMinutes;
  //   });

  //   if (futureDoses.length === 0) return [];

  //   const earliestTime = Math.min(...futureDoses.map((med: { frequencytime: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: NumberConstructor): [any, any]; new(): any; }; }; }; }) => {
  //     const [h, m] = med.frequencytime.split(':').map(Number);
  //     return h * 60 + m;
  //   }));

  //   return futureDoses.filter((med: { frequencytime: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: NumberConstructor): [any, any]; new(): any; }; }; }; }) => {
  //     const [h, m] = med.frequencytime.split(':').map(Number);
  //     return (h * 60 + m) === earliestTime;
  //   });
  // }

  // getCurrentHourDoses(): any[] {
  //   const currentHour = this.currentTime.getHours();

  //   const currentHourDoses = this.resDatapostPrescription.filter((med: any) => {
  //     if (!med.frequencytime) return false;

  //     const [hours] = med.frequencytime.split(':').map(Number);
  //     return hours === currentHour;
  //   });

  //   return currentHourDoses;
  // }

  isTimeOver(timeString: string): boolean {
    const now = new Date();

    const thresholdTime = new Date(now.getTime() + 30 * 60000);

    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    const inputTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      seconds
    );

    // Compare the times
    return inputTime < thresholdTime;
  }
  // onScanDrung(currentBarcodeDrug: string) {
  //   console.log(this.groupedData);
  //   const utcDate = new Date(Date.UTC(2025, 5, 19, 10, 30, 0));
  //   console.log(this.resDatapostPrescription);

  //   const scannedItems = this.resDatapostPrescription
  //     .filter((item: { orderitembarcode: string; orderitembarcodecase?: any }) => {
  //       if (Array.isArray(item.orderitembarcodecase) && item.orderitembarcodecase.length > 0) {
  //         return item.orderitembarcodecase.includes(currentBarcodeDrug);
  //       } else {
  //         return item.orderitembarcode === currentBarcodeDrug;
  //       }
  //     });

  //   if (scannedItems.length === 0) {
  //     console.warn('ไม่พบยาใน barcode ที่สแกน');
  //     return;
  //   }

  //   // ➤ เรียก popup login
  //   const dialogRef = this.dialog.open(LoginDialogComponent, {
  //     width: '300px'
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result?.success) {
  //       //  ได้ข้อมูล user จาก popup
  //       const username = result.username || 'Robot';
  //       const userid = result.userid || '1';

  //       //  update ข้อมูลผู้รับยา
  //       scannedItems.forEach((item: any) => {
  //         item.recivedatetime = utcDate.toISOString();
  //         item.reciveuserid = userid;
  //         item.reciveusername = username;
  //       });

  //       console.log('ยาอัปเดตหลัง login:', this.resDatapostPrescription);

  //       this.currentBarcodeDrug = '';

  //       const countReceived = this.resDatapostPrescription.filter(
  //         (item: { reciveuserid: any }) =>
  //           item.reciveuserid != null && item.reciveuserid !== ''
  //       ).length;

  //       if (countReceived === this.resDatapostPrescription.length) {
  //         this.confirmAllMedications();
  //       }

  //       console.log('Count of reciveuserid not null:', countReceived);
  //     } else {
  //       console.log('ยกเลิก login');
  //     }
  //   });
  // }
  hideKeyboard(): void {
    if (this.BarcodeDrug && this.BarcodeDrug.nativeElement) {
      this.BarcodeDrug.nativeElement.value = ''; // Clear input value
      this.BarcodeDrug.nativeElement.blur();
    }
  }
  showshelf() {
    this.handheldService.postshelf({}).subscribe((response) => {
      this.shelfs = response;
      //console.log(this.shelfs);
    });
  }
  onPopupShelf(dataSend: any) {
    console.log(dataSend);
    const filterData = dataSend?.dataSource?.filteredData ?? [];
    const shelfsData = this.shelfs.data;

    console.log(filterData.length);
    console.log(shelfsData);
    const dt = {
      filterData,
      shelfsData,
    };

    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    const dialogRef = this.dialog.open(PopuprectiveshelfdescComponent, {
      maxWidth: 'none',
      maxHeight: 'none',
      width: isMobile ? '97%' : '50%',
      height: isMobile ? '90%' : '95%',
      hasBackdrop: true,
      backdropClass: 'custom-blur-backdrop',
      panelClass: 'custom-dialog-container',
      data: {
        title: 'เลือกสถานที่เก็บยา',
        fields: dt,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== 'Close') {
        // ทำอะไรต่อเมื่อ Dialog ปิด
      }
    });
  }
  onScanDrung(barcode: string) {
    //  const barcode = event.target.value;
    this.scannedBarcode = barcode; // จำ barcode ที่สแกนไว้
    //console.log('Scanned barcode:', barcode);

    //console.log(this.groupedData);
    const utcDate = new Date(Date.UTC(2025, 5, 19, 10, 30, 0));
    //console.log(this.resDatapostPrescription);
    // this.dialog.open(PopupnodataComponent, {
    //   width: '400px',
    //   height: '250px',
    //   disableClose: true,
    //   panelClass: 'no-radius-dialog',
    //   data: { message: 'onScanDrung' + this.resDatapostPrescription }
    // });
    this.resDatapostPrescription
      .filter(
        (item: { orderitembarcode: string; orderitembarcodecase?: any }) => {
          if (
            Array.isArray(item.orderitembarcodecase) &&
            item.orderitembarcodecase.length > 0
          ) {
            return item.orderitembarcodecase.includes(barcode);
          } else {
            return item.orderitembarcode === barcode;
          }
        }
      )
      .forEach(
        (items: {
          reciveuserid: string;
          reciveusername: string;
          recivedatetime: string;
        }) => {
          // const randomString = options2[Math.floor(Math.random() * options2.length)];
          items.recivedatetime = String(utcDate.toISOString());
          items.reciveuserid = '1';
          items.reciveusername = 'Robot';
        }
      );

    //console.log(this.resDatapostPrescription);
    // const timeOver = this.resDatapostPrescription.filter((item: { frequencytime: string; }) => this.isTimeOver(item.frequencytime) == true).length;
    // const HAD = this.resDatapostPrescription.filter((item: { highalert: string; }) => item.highalert == '1').length;
    // const userCheck = this.resDatapostPrescription.filter((item: { usercheckDatetime: string; }) => !item.usercheckDatetime).length;

    setTimeout(() => {
      const el = document.querySelector(`[data-barcode="${barcode}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100); // wait view updated
    this.currentBarcodeDrug = '';
    this.currentBarcode = '';

    const countReceived = this.resDatapostPrescription.filter(
      (item: { reciveuserid: any }) =>
        item.reciveuserid != null && item.reciveuserid !== ''
    ).length;

    // Auto update when recieve all
    if (countReceived === this.resDatapostPrescription.length) {
      // this.showLoginBeforeConfirm();
      this.showConfirmationToast();
      // เพิ่มครบก่อนแล้ว login
      //this.confirmAllMedications();
    }
    console.log('Count of reciveuserid not null:', countReceived);
  }

  showLoginBeforeConfirm() {
    return this.dialog.open(LoginDialogComponent, {
      width: '300px',
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result?.success) {
    //     const username = result.username || 'Robot';
    //     const userid = result.userid || '1';

    //     // อัปเดตข้อมูล user ให้กับทุกรายการที่มี recivedatetime
    //     this.resDatapostPrescription.forEach((item: any) => {
    //       if (item.recivedatetime) {
    //         item.reciveuserid = userid;
    //         item.reciveusername = username;
    //       }
    //     });

    //     this.confirmAllMedications();
    //   } else {
    //     console.warn('ยกเลิก Login ก่อนบันทึก');
    //   }
    // });
  }
  removeFocus(event: FocusEvent) {
    (event.target as HTMLInputElement).blur(); // ปิด keyboard
  }
  onFocus(event: FocusEvent) {
    // บังคับ blur ทันทีที่ input ถูก focus
    (event.target as HTMLInputElement).blur();
  }

  formatfrequencytime() {
    this.resDatapostPrescription.forEach((item: { frequencytime: string }) => {
      if (item.frequencytime && item.frequencytime.length === 4) {
        // แทรก ":" ระหว่างชั่วโมงและนาที
        item.frequencytime =
          item.frequencytime.substring(0, 2) +
          ':' +
          item.frequencytime.substring(2) +
          ':' +
          '00';
      }
    });
  }

  onScanFocus() {
    this.scanFocus = true;
  }

  onScanBlur() {
    this.scanFocus = false;
  }

  // Method to update status
  updateStatus(message: string, isSuccess: boolean) {
    this.statusMessage = message;
    this.statusColor = isSuccess ? '#4CAF50' : '#F44336';
    this.scanSuccess = isSuccess;
    this.scanMessage = message;

    // Optionally reset status after delay
    setTimeout(() => {
      this.statusMessage = 'Ready to scan';
      this.statusColor = '#4CAF50';
    }, 3000);
  }

  filterByType(type: string): void {
    if (!this.resDatapostPrescription) return;

    switch (type) {
      case 'package':
        this.filteredMedications = this.resDatapostPrescription.filter(
          (item: { sendmachine: string }) => item.sendmachine === 'Y'
        );
        break;
      case 'sticker':
        this.filteredMedications = this.resDatapostPrescription.filter(
          (item: { sendmachine: string }) => item.sendmachine === 'N'
        );
        break;
      case 'overdue':
        this.filteredMedications = this.resDatapostPrescription.filter(
          (item: { frequencytime: string }) =>
            this.isTimeOver(item.frequencytime)
        );
        break;
      default:
        this.filteredMedications = [...this.resDatapostPrescription];
    }
  }

  filterByTime(filter: string): void {
    this.timeFilter = filter;
    this.updateFilteredMedications();
  }

  updateFilteredMedications(): void {
    if (!this.resDatapostPrescription) return;

    // First filter by time
    let filtered = [...this.resDatapostPrescription];

    if (this.timeFilter === 'current') {
      filtered = this.getCurrentHourDoses();
    } else if (this.timeFilter === 'next') {
      filtered = this.getNextDoses();
    }

    // Then apply any type filters if needed
    this.filteredMedications = filtered;
  }

  getOverdueCount(): number {
    if (!this.resDatapostPrescription) return 0;
    return this.resDatapostPrescription.filter(
      (item: { frequencytime: string }) => this.isTimeOver(item.frequencytime)
    ).length;
  }

  canConfirm(): boolean {
    if (!this.resDatapostPrescription) return false;

    // Check if all medications have been scanned
    const allScanned = this.resDatapostPrescription.every(
      (item: { recivedatetime: string }) => item.recivedatetime
    );

    // Check if there are any medications to confirm
    const hasMedications = this.resDatapostPrescription.length > 0;

    return allScanned && hasMedications;
  }

  // Update your existing getNextDoses() method to return filtered array
  getNextDoses(): any[] {
    if (!this.resDatapostPrescription) return [];

    this.formatfrequencytime();
    const currentMinutes =
      this.currentTime.getHours() * 60 + this.currentTime.getMinutes();

    const futureDoses = this.resDatapostPrescription.filter(
      (med: { frequencytime: string }) => {
        if (!med.frequencytime) return false;

        const [hours, minutes] = med.frequencytime.split(':').map(Number);
        const medMinutes = hours * 60 + minutes;

        return medMinutes >= currentMinutes;
      }
    );

    if (futureDoses.length === 0) return [];

    const earliestTime = Math.min(
      ...futureDoses.map((med: { frequencytime: string }) => {
        const [h, m] = med.frequencytime.split(':').map(Number);
        return h * 60 + m;
      })
    );

    return futureDoses.filter((med: { frequencytime: string }) => {
      const [h, m] = med.frequencytime.split(':').map(Number);
      return h * 60 + m === earliestTime;
    });
  }

  // Update your existing getCurrentHourDoses() method to return filtered array
  getCurrentHourDoses(): any[] {
    if (!this.resDatapostPrescription) return [];

    const currentHour = this.currentTime.getHours();

    return this.resDatapostPrescription.filter((med: any) => {
      if (!med.frequencytime) return false;

      const [hours] = med.frequencytime.split(':').map(Number);
      return hours === currentHour;
    });
  }

  // groupData():a {
  //   this.originalData.forEach(item => {
  //     const barcode = item.orderitembarcode;
  //     if (!this.groupedData[barcode]) {
  //       this.groupedData[barcode] = [];
  //     }
  //     this.groupedData[barcode].push(item);
  //   });
  // }

  // getBarcodes(): string[] {
  //   return Object.keys(this.groupedData);
  // }

  getBarcodes(): string[] {
    return Object.keys(this.groupedData);
  }

  isGroupReceived(barcode: string): boolean {
    if (!this.groupedData || !this.groupedData[barcode]) return false;
    return this.groupedData[barcode].every((med: any) => !!med.recivedatetime);
  }

  // KEY: any = '';

  // @HostListener('window:keydown', ['$event'])
  // handleKeyboardEventkeydown(event: KeyboardEvent) {
  //   console.log(event.key);

  //   // Example: Press 'Enter' to focus on the medication input
  //   // Example: Press 'Enter' to confirm all medications if possible
  //   if (event.key === 'Enter' && !this.hasScanned) {
  //     // this.onScanDrung()
  //     console.log(this.KEY);
  //     this.currentBarcode = this.KEY;
  //     // this.onClickPatient(this.KEY);
  //     this.KEY = '';
  //   } else {
  //     this.KEY += event.key;
  //   }
  //   // Example: Press 'Escape' to clear all scanned medications
  //   if (event.key === 'Escape') {
  //     this.clearAll();
  //   }
  //   // Example: Press 'h' to show medication history
  //   if (event.key.toLowerCase() === 'h') {
  //     this.showMedicationHistory();
  //   }
  // }

  viewDrugs(drug: any) {
    const url = `/apiipd/master/drugs/image/${drug}/8`;
    return url;
  }
  formatTimeHM(time: string): string {
    if (!time) return '';
    if (time.length === 4) {
      return `${time.substring(0, 2)}:${time.substring(2, 4)}`;
    }
    if (time.length === 3) {
      return `0${time.substring(0, 1)}:${time.substring(1, 3)}`;
    }
    return time;
  }

  sumOrderQty(barcode: string): number {
    if (!this.groupedData || !this.groupedData[barcode]) return 0;
    return this.groupedData[barcode].reduce((sum: number, item: any) => {
      return sum + (Number(item.orderqty) || 0);
    }, 0);
  }
  openImagePopupArr(urls: string[]) {
    this.popupImageUrls = urls;
    this.showPopup = true;
  }

  getAllImageUrls(orderitemcode: string): string[] {
    if (!orderitemcode) return ['assets/no-image.png'];
    return [
      `http://172.16.10.3/apiipd/master/drugs/image/${orderitemcode}/8`,
      `http://172.16.10.3/apiipd/master/drugs/image/${orderitemcode}/7`,
    ];
  }

  async openReceiveMsgPopup(message: string): Promise<void> {
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    const msg = this.dialog.open(ReciveMsgComponent, {
      maxWidth: 'none',
      maxHeight: 'none',
      width: isMobile ? '95%' : '40%',
      height: isMobile ? 'auto' : 'auto',
      hasBackdrop: true,
      backdropClass: 'custom-blur-backdrop',
      panelClass: 'custom-dialog-container',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'ข้อความ',
        message: message,
        fields: ['recieveremark', 'recievedate'],
      },
    });
    msg.afterClosed().subscribe((r) => {
      if (r) {
        let resDataz = this.resDatapostPrescription.map(
          (item: {
            _id: any;
            reciveuserid: any;
            reciveusername: any;
            recivedatetime: any;
            recivestatus: any;
            reciveremark: any;
          }) => ({
            _id: item._id,
            updatestatus: {
              recivestatus: 'R',
              reciveremark: r,
              reciveuserid: item.reciveuserid,
              reciveusername: item.reciveusername,
              recivedatetime: new Date(),
            },
          })
        );

        this.handheldService.updatepackage(resDataz).subscribe((response) => {
          if (response.status === 200) {
            this.toastr.success('บันทึกเรียบร้อย!', 'แจ้งเตือน');
            this.resDataPatientadmit = [];
            this.resDatapostPrescription = [];
            this.hasScanned = false;
            this.focusInput();
            this.currentBarcode = '';
            this.onScanAN2();
            // this.toastr.success('Successful!', 'แจ้งเตือน');
            // this.resDataPatientadmit2 = response.data
            // this.hasScanned = false;

            // console.log(response.data);
            // this.onpostprescription(an)
            // this.getDevice()
          } else {
            // this.loading = false;
          }
        });
      }
    });
  }
}

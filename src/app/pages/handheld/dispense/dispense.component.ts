import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

// import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HandheldService } from '../../../service/handheld/handheld.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../../components/popup/popup.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
// import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PopupuserotherComponent } from '../../../components/popup/popupuserother/popupuserother.component';
export interface SelectPopup {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dispense',
  standalone: false,

  templateUrl: './dispense.component.html',
  styleUrl: './dispense.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInDown', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('0.4s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('pulse', [
      transition(':enter', [
        animate('1.5s ease-in-out',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.05)', offset: 0.3 }),
            style({ transform: 'scale(0.95)', offset: 0.6 }),
            style({ transform: 'scale(1)', offset: 1 })
          ]))
      ])
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate('0.4s 0.2s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('100ms', [
          animate('0.3s ease-in',
            keyframes([
              style({ opacity: 0, transform: 'translateY(10px)', offset: 0 }),
              style({ opacity: 0.5, transform: 'translateY(5px)', offset: 0.3 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
            ]))
        ]), { optional: true })
      ])
    ]),
    trigger('bounceIn', [
      transition(':enter', [
        animate('0.5s ease-in',
          keyframes([
            style({ transform: 'scale(0.3)', opacity: 0, offset: 0 }),
            style({ transform: 'scale(1.1)', opacity: 1, offset: 0.5 }),
            style({ transform: 'scale(0.9)', offset: 0.7 }),
            style({ transform: 'scale(1)', offset: 1 })
          ]))
      ])
    ]),
    trigger('bounceInUp', [
      transition(':enter', [
        style({ transform: 'translateY(40px)', opacity: 0 }),
        animate('0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class DispenseComponent implements AfterViewInit {
  @ViewChild('medicationInput') medicationInput!: ElementRef<HTMLInputElement>;
  @ViewChild('medicationInput2') medicationInput2!: ElementRef<HTMLInputElement>;
  devicesPopup: SelectPopup[] = [];
  hasScanned = false;
  scanTime = new Date();
  currentBarcode = '';
  currentBarcodeDrug = '';
  showScanFeedback = false;
  isMobile = false;
  patientadmits: any;
  hiddenSearch: boolean = false;
  currentTime = new Date();
  resTemDatapostPrescription: any;
  medications: any[] = [];
  patient = {
    photoUrl: './Document/dist/img/avatar5.png',
    name: 'พี่หนึ่ง ตีหรี่',
    hn: 'HN-123456',
    an: 'AN-789012',
    room: 'ICU-3',
    bed: 'B-02',
    status: 'stable'
  };
  lenSticker: any;
  scanFocus: boolean = true;
  lenPack: any;
  statusColor: string = '#4CAF50'; // Default status color (green)
  statusMessage: string = 'Ready to scan'; // Default status message
  scanSuccess: boolean = false; // Tracks scan success state
  scanMessage: string = ''; // Feedback message for scans
  medications_ = [
    {
      name: 'Amoxicillin 500mg',
      date: 'Today, 08:00 AM',
      dosage: '1 tablet',
      instruction: 'After breakfast',
      confirmed: false,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s"
    },
    {
      name: 'Lisinopril 10mg',
      date: 'Today, 02:00 PM',
      dosage: '1 tablet',
      instruction: 'With a glass of water',
      confirmed: false,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s"

    },
    {
      name: 'Atorvastatin 20mg',
      date: 'Today, 08:00 PM',
      dosage: '1 tablet',
      instruction: 'After dinner',
      confirmed: false,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s"
    },
    {
      name: 'Metformin 850mg',
      date: 'Today, 08:00 AM',
      dosage: '1 tablet each',
      instruction: 'With meals',
      confirmed: false,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s"
    }
  ];
  // handheldService: any;
  resDataPatientadmit: any;
  resDataPatientadmit2: any;
  resDataPatientadmit3: any;
  resDatapostPrescription: any;
  timeFilter: string = 'all';
  filteredMedications: any[] = [];
  // loading: boolean;
  dataSource: any;
  SelDisp: boolean = false;

  textstartTime: string = String(this.getNextHour());
  textendTime: string = String(this.getNextHour(1));

  ngOnInit() {
    // Simulate loading data
    this.onScanAN2();
    setTimeout(() => {
      this.patient.status = 'stable';
    }, 1500);
  }
  private getNextHour(hoursToAdd = 0): string {
    const now = new Date();
    now.setHours(now.getHours() + hoursToAdd, 0, 0, 0);
    return now.toTimeString().substring(0, 5);
  }

  constructor(private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private handheldService: HandheldService,
    private toastr: ToastrService
  ) {
    this.checkIfMobile();
  }

  ngAfterViewInit() {
    this.focusInput();
  }

  checkIfMobile() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/' && event.target !== this.medicationInput.nativeElement) {
      event.preventDefault();
      this.focusInput();
    }
  }

  onInputFocus() {
    this.currentBarcode = '';
    if (this.isMobile) {
      this.renderer.addClass(document.body, 'keyboard-open');
    }
  }

  onInputBlur() {
    if (this.isMobile) {
      this.renderer.removeClass(document.body, 'keyboard-open');
    }
  }

  focusInput() {
    setTimeout(() => {
      this.medicationInput.nativeElement.focus();

      // Force keyboard to open on mobile
      if (this.isMobile) {
        this.medicationInput.nativeElement.click();
        this.medicationInput.nativeElement.setAttribute('inputmode', 'search');
      }
    }, 100);
  }

  focusInput2() {
    setTimeout(() => {
      this.medicationInput2.nativeElement.focus();

      // Force keyboard to open on mobile
      if (this.isMobile) {
        this.medicationInput2.nativeElement.click();
        this.medicationInput2.nativeElement.setAttribute('inputmode', 'search');
      }
    }, 100);
  }

  blurInput() {
    if (this.isMobile) {
      this.medicationInput.nativeElement.blur();
    }
  }

  processBarcode(barcode: string) {
    if (!barcode || barcode.trim() === '') return;

    const newMed = this.fetchMedicationData(barcode);
    // console.log(this.medications)
    if (!this.medications.some(m => m.barcode === barcode)) {
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
        barcode: "1234",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s"
      },
      {
        name: 'Amoxicillin 250mg',
        imageUrl: 'assets/amoxicillin.png',
        quantity: 21,
        unit: 'capsules',
        instructions: 'หลังอาหารเย็น',
        time: '2025-04-24 22:00',
        type: 'normal',
        barcode: "1234",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s"
      },
      {
        name: 'Atorvastatin 20mg',
        imageUrl: 'assets/atorvastatin.png',
        quantity: 30,
        unit: 'tablets',
        instructions: 'หลังอาหารเย็น',
        time: '2025-04-24 22:00',
        type: 'overtime',
        barcode: "1234",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYl8ZXcRRnj5k9DU3dnjnRWqYA4yvpL0qhgA&s"
      }
    ];

    // const index = Math.abs(this.hashCode(barcode)) % medTypes.length;
    // return medTypes[index];
    return medTypes.filter(item => String(item.barcode) === String(barcode))
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
      case "overtime":
        this.confirmDispenseError();
        break;
      case "normal":
        this.confirmDispense();
        break;

      case "HAD":
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
  confirmDispense() {
    if (this.medications.length === 0) return;

    const medNames = this.medications.map(m => m.name).join(', ');
    alert(`Dispensed ${this.medications.length} medications: ${medNames}`);
    this.clearAll();
  }

  confirmDispenseError(currentBarcodeDrug: any = '') {
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
          { key: 'mederror_desc', label: 'เลือกเหตุผล', placeholder: 'เลือกเหตุผล', type: 'autocomplete' },
          { key: 'mederror_freetext', label: 'เหตุผลเพิ่มเติ่ม', placeholder: 'เหตุผลเพิ่มเติ่ม', type: 'string' },
          // { key: 'deviceDesc', label: 'Device Desc', placeholder: 'Enter device desc', type: 'string' },
          // { key: 'deviceIP', label: 'Device IP', placeholder: 'Enter device ip', type: 'string' },
          // { key: 'computerName', label: 'Computer Name', placeholder: 'Enter computer name', type: 'string' },
          // { key: 'pharmacyCode', label: 'Pharmacy Code', placeholder: 'Enter pharmacy code', type: 'string' },
          // { key: 'sortOrder', label: 'sortOrder', placeholder: 'Enter sortOrder', type: 'number' },
          // { key: 'orderzone', label: 'orderzone', placeholder: 'Enter orderzone', value:0, type: 'number' },
          // { key: 'isEnabled', label: 'isEnabled', placeholder: 'Enter isEnabled', value: false, type: 'boolean' },
        ],
        options: {
          mederror_desc: [
            {
              label: 'TEST 1',
              value: 'TEST 1'
            },
            {
              label: 'TEST 2',
              value: 'TEST 2'
            },
            {
              label: 'TEST 3',
              value: 'TEST 3'
            },
          ],
        },
        useLabel: {
          mederror_desc: true,
        },
      }
    });



    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        const utcDate = new Date(Date.UTC(2025, 5, 19, 10, 30, 0));
        this.resDatapostPrescription.filter((item: { orderitembarcode: string; }) => item.orderitembarcode === currentBarcodeDrug).forEach((items: {
          dispenseuserid: string;
          dispenseusername: string; dispensedatetime: string; dispenseuseridother: string; dispenseusernameother: string; dispensedatetimeother: string;
          mederror_desc: string; mederror_freetext: string; mederror_type: string;
        }) => {
          items.dispensedatetime = String(utcDate.toISOString())
          items.dispenseuserid = '1'
          items.dispenseusername = 'Robot1',
            items.mederror_desc = result.mederror_desc,
            items.mederror_freetext = result.mederror_freetext,
            items.mederror_type = 'APPDPS'
        });
        // console.log(result)
        // this.toastr.success('Successful!', 'แจ้งเตือน');
        // this.resDataPatientadmit = [];
        // this.resDatapostPrescription = [];
        // this.hasScanned = false;
        // this.focusInput();
        // this.currentBarcode = '';
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

  confirmDispenseHAD(currentBarcodeDrug: any = '') {
    this.dialog.closeAll();
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    const dialogRef = this.dialog.open(PopupuserotherComponent, {
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
        ],
      }
    });



    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // let resDataz = {}
        this.handheldService.loginEmar(result).subscribe({
          next: (response) => {
            // console.log(response);

            if (response.status === 200 && response.data.length > 0) {

              const utcDate = new Date(Date.UTC(2025, 5, 19, 10, 30, 0));
              this.resDatapostPrescription.filter((item: { orderitembarcode: string; }) => item.orderitembarcode === currentBarcodeDrug).forEach((items: {
                dispenseuserid: string;
                dispenseusername: string; dispensedatetime: string; dispenseuseridother: string; dispenseusernameother: string; dispensedatetimeother: string;
              }) => {
                items.dispensedatetime = String(utcDate.toISOString())
                items.dispenseuserid = '1'
                items.dispenseusername = 'Robot1'
                items.dispenseuseridother = response.data[0].userID
                items.dispenseusernameother = response.data[0].fullname
                items.dispensedatetimeother = String(utcDate.toISOString())
              });
              //  console.log(   this.resDatapostPrescription)
              // this.toastr.success('Successful!', 'แจ้งเตือน');
              // this.showMedicationHistory()
              // this.toastr.success('Successful!', 'แจ้งเตือน');
              // this.resDataPatientadmit2 = response.data
              // this.hasScanned = false;

              // console.log(response.data);
              // this.onpostprescription(an)
              // this.getDevice()
            } else {
              // this.loading = false;
              this.toastr.warning('ไม่พบผู้ใช้งาน', 'แจ้งเตือน', {
                toastClass: 'custom-toast-warning',
              });
            }
          },
          error: (err) => {
            // console.error('Update Failed:', err);
            this.toastr.warning(err, 'แจ้งเตือน', {
              toastClass: 'custom-toast-warning',
            });
          },
        });
        // console.log('Received Data:', result);
        // this.getDevice()
      } else {
        // console.log('Dialog closed without data');
      }
    });


  }


  confirmDispenseHADOverTime(currentBarcodeDrug: any = '') {
    this.dialog.closeAll();
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    const dialogRef = this.dialog.open(PopupuserotherComponent, {
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
        ],
      }
    });



    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'Close' && result !== undefined) {
        // let resDataz = {}
        this.handheldService.loginEmar(result).subscribe({
          next: (response) => {
            // console.log(response);

            if (response.status === 200 && response.data.length > 0) {
              // console.log(response)
              const utcDate = new Date(Date.UTC(2025, 5, 19, 10, 30, 0));
              this.resDatapostPrescription.filter((item: { orderitembarcode: string; }) => item.orderitembarcode === currentBarcodeDrug).forEach((items: {
                dispenseuserid: string;
                dispenseusername: string; dispensedatetime: string; dispenseuseridother: string; dispenseusernameother: string; dispensedatetimeother: string;
              }) => {
                items.dispensedatetime = String(utcDate.toISOString())
                items.dispenseuserid = '1'
                items.dispenseusername = 'Robot1'
                items.dispenseuseridother = response.data.userID
                items.dispenseusernameother = response.data.fullname
                items.dispensedatetimeother = response.data.fullname
              });
              // this.toastr.success('Successful!', 'แจ้งเตือน');
              // this.showMedicationHistory()
              // this.toastr.success('Successful!', 'แจ้งเตือน');
              // this.resDataPatientadmit2 = response.data
              // this.hasScanned = false;

              // console.log(response.data);
              // this.onpostprescription(an)
              // this.getDevice()
            } else {
              // this.loading = false;
              this.toastr.warning('ไม่พบผู้ใช้งาน', 'แจ้งเตือน', {
                toastClass: 'custom-toast-warning',
              });
            }
          },
          error: (err) => {
            // console.error('Update Failed:', err);
            this.toastr.warning(err, 'แจ้งเตือน', {
              toastClass: 'custom-toast-warning',
            });
          },
        });
        // console.log('Received Data:', result);
        // this.getDevice()
      } else {
        // console.log('Dialog closed without data');
      }
    });


  }
  onEditDosage(row: any) {
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
        title: 'ระบุจำนวน',
        apiUrl: ``,
        fields: [
          { key: '_id', label: 'เลือกเหตุผล', placeholder: 'Enter device code', type: 'string', value: row._id },
          { key: 'dosage', label: 'จำนวน', placeholder: 'จำนวน', type: 'string', value: row.dosage },
          // { key: 'deviceName', label: 'เหตุผลการให้ยา', placeholder: 'Enter device name', type: 'string' },
          // { key: 'deviceDesc', label: 'Device Desc', placeholder: 'Enter device desc', type: 'string' },
          // { key: 'deviceIP', label: 'Device IP', placeholder: 'Enter device ip', type: 'string' },
          // { key: 'computerName', label: 'Computer Name', placeholder: 'Enter computer name', type: 'string' },
          // { key: 'pharmacyCode', label: 'Pharmacy Code', placeholder: 'Enter pharmacy code', type: 'string' },
          // { key: 'sortOrder', label: 'sortOrder', placeholder: 'Enter sortOrder', type: 'number' },
          // { key: 'orderzone', label: 'orderzone', placeholder: 'Enter orderzone', value:0, type: 'number' },
          // { key: 'isEnabled', label: 'isEnabled', placeholder: 'Enter isEnabled', value: false, type: 'boolean' },
        ],
      }
    });



    dialogRef.afterClosed().subscribe(result => {
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

  styleType(medType: string) {
    const styles: any = {};

    if (medType === "overtime") {
      styles.color = 'red';
      styles.paddingTop = '1rem';
      styles.marginBottom = '-1.3rem';
    }

    if (medType === "HAD") {
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
    this.currentBarcode = '';
    this.onScanAN2();
  }

  confirmAllMedications() {
    // Confirm all unconfirmed medications
    this.medications.forEach(med => {
      if (!med.confirmed) {
        med.confirmed = true;
        // Add any additional confirmation logic here
      }
    });

    // Show confirmation feedback
    this.showConfirmationToast();
  }

  showConfirmationToast() {

    // const timeOver = this.resDatapostPrescription.filter((item: { frequencytime: string; }) => this.isTimeOver(item.frequencytime) == true).length;
    // const HAD = this.resDatapostPrescription.filter((item: { highalert: string; }) => item.highalert == '1').length;
    // const userCheck = this.resDatapostPrescription.filter((item: { usercheckDatetime: string; }) => !item.usercheckDatetime).length;

    // // console.log(this.resDatapostPrescription);
    // if (userCheck > 0) {
    //   this.toastr.warning('กรุณาแสกนซองยาให้ครบ', 'แจ้งเตือน', {
    //     toastClass: 'custom-toast-warning',
    //   });

    // } else if (HAD > 0) {
    //   this.confirmDispenseHAD();

    // } else if (timeOver > 0) {
    //   this.confirmDispenseError();
    // } else {
    //   this.toastr.success('Successful!', 'แจ้งเตือน');
    //   this.resDataPatientadmit = [];
    //   this.resDatapostPrescription = [];
    //   this.hasScanned = false;
    //   this.focusInput();
    //   this.currentBarcode = '';
    // }

    // console.log(this.resDatapostPrescription)

    let resDataz = this.resDatapostPrescription.map((item: {
      preparemedicine_id: any; dispensedatetime: any; dispenseuserid: any; dispenseusername: any;
      dispenseuseridother: string; dispenseusernameother: string; dispensedatetimeother: string;


    }) => ({
      _id: item.preparemedicine_id,
      dispensedatetime: item.dispensedatetime,
      dispenseuserid: item.dispenseuserid,
      dispenseusername: item.dispenseusername,
      dispenseuseridother: item.dispenseuseridother,
      dispenseusernameother: item.dispenseusernameother,
      dispensedatetimeother: item.dispensedatetimeother,
    }));

    let resDatazMederror = this.resDatapostPrescription
      .filter((item: {
        mederror_desc: string | null | undefined;
        mederror_freetext: string | null | undefined;
      }) => {
        const desc = item.mederror_desc || '';
        const freeText = item.mederror_freetext || '';
        return desc.length > 0 || freeText.length > 0;
      })
      .map((item: {
        ordercreatedate: any;
        prescriptionno: any;
        hn: any;
        an: any;
        orderitemcode: any;
        orderitemname: any;
        orderunitdesc: any;
        orderqty: any;
        shelfzone: any;
        shelfname: any;
        mederror_desc: any;
        mederror_freetext: any;
        mederror_type: any;
        preparemedicine_id: any;
        dispensedatetime: any;
        dispenseuserid: any;
        dispenseusername: any;
        dispenseuseridother: string;
        dispenseusernameother: string;
        dispensedatetimeother: string;
      }) => ({
        _id_prescription: item.preparemedicine_id,
        ordercreatedate: item.ordercreatedate,
        prescriptionno: item.prescriptionno,
        hn: item.hn,
        an: item.an,
        orderitemcode: item.orderitemcode,
        orderitemname: item.orderitemname,
        orderunitdesc: item.orderunitdesc,
        orderqty: item.orderqty,
        shelfzone: item.shelfzone,
        shelfname: item.shelfname,
        jobuserid: item.dispenseuserid,
        jobusername: item.dispenseusername,
        mederror_desc: item.mederror_desc || '',
        mederror_freetext: item.mederror_freetext || '',
        mederror_robot: '',
        mederror_userid: '',
        mederror_username: '',
        mederror_type: item.mederror_type,
      }));
    // console.log(this.resDatapostPrescription)
    if (resDatazMederror.length > 0) {
      this.handheldService.postMedError(resDatazMederror).subscribe({
        next: (response) => {
          // console.log(response);

          if (response.status === 200) {
            // this.toastr.success('Successful!', 'แจ้งเตือน');
            // this.showMedicationHistory()
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
    }


    this.handheldService.updatprepare(resDataz).subscribe({
      next: (response) => {
        // console.log(response);

        if (response.status === 200) {
          this.toastr.success('Successful!', 'แจ้งเตือน');
          this.showMedicationHistory()
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
  }

  onScanAN2() {
    this.handheldService.getDispense({ "wardcode": "1641", "recivedatetime": { "$ne": null } }).subscribe({
      next: (response) => {
        // console.log(response);

        if (response.status === 200) {
          // this.toastr.success('Successful!', 'แจ้งเตือน');
          this.resDataPatientadmit2 = response.data
          this.resDataPatientadmit3 = this.getUniqueByAn(this.resDataPatientadmit2);
          this.hasScanned = false;
          this.formatfrequencytime();

          // console.log(this.resDataPatientadmit3)

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
    this.currentBarcode = "";
  }

  getUniqueByAn(data: any[]): any[] {
    const seen = new Set();
    return data.filter(item => {
      const duplicate = seen.has(item.an);
      seen.add(item.an);
      return !duplicate;
    });
  }
  //   groupByAn(data: any[]): { [key: string]: any[] } {
  //   return data.reduce((acc, item) => {
  //     const key = item.an;
  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }
  //     acc[key].push(item);
  //     return acc;
  //   }, {});
  // }

  onClickPatient(an: string) {
    this.resDatapostPrescription = this.resDataPatientadmit2.filter((item: { an: string; }) => item.an === an);
    this.fetchMedicationData = this.resDatapostPrescription.sort((a: { orderitembarcode: string; }, b: { orderitembarcode: any; }) => {
      return a.orderitembarcode.localeCompare(b.orderitembarcode);
    });;
    this.lenPack = this.resDatapostPrescription.filter((item: { sendmachine: string; }) => item.sendmachine == "Y")
    this.lenSticker = this.resDatapostPrescription.filter((item: { sendmachine: string; }) => item.sendmachine == "N")
    this.updateFilteredMedications();
    this.SelDisp = true;
    this.hasScanned = true;
    //  console.log(    this.resDatapostPrescription );
    // this.resDataPatientadmitSel = this.resDataPatientadmit2.find((item: { an: string; }) => item.an === an);
    // this.handheldService.postpatientadmitpackage({ "an": an, "recivedatetime": { "$ne": null } }
    // ).subscribe({
    //   next: (response) => {
    //     // console.log(response);

    //     if (response.status === 200) {
    //       // console.log(response);
    //       this.resDatapostPrescription = response.data

    //       this.formatfrequencytime();
    //       this.resTemDatapostPrescription = this.resDatapostPrescription
    //       // this.resDatapostPrescription = this.getNextHourMedications(this.resTemDatapostPrescription);
    //       // this.toastr.success('Successful!', 'แจ้งเตือน');
    //       // this.resDataPatientadmit = response.data.find((item: { an: string; }) => item.an === an);
    //       this.hasScanned = true;
    //       // 
    //       // this.onpostprescription(an)
    //       // this.getDevice()
    //     } else {
    //       // this.loading = false;
    //     }
    //   },
    //   error: (err) => {
    //     // console.error('Update Failed:', err);
    //     // this.toastr.warning(err, 'แจ้งเตือน', {
    //     //   toastClass: 'custom-toast-warning',
    //     // });
    //   },
    // });
    this.currentBarcode = "";
  }


  onScanAN(an: string) {
    this.handheldService.postpatientadmit({ "wardcode": "1641" }).subscribe({
      next: (response) => {
        // console.log(response);

        if (response.status === 200) {
          // this.toastr.success('Successful!', 'แจ้งเตือน');
          this.resDataPatientadmit = response.data.find((item: { an: string; }) => item.an === an);
          this.hasScanned = true;
          this.onpostprescription(an)
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
    this.currentBarcode = "";
  }

  onpostprescription(an: string) {
    this.handheldService.postprescription({ "wardcode": "1641" }).subscribe({
      next: (response) => {
        // console.log(response);

        if (response.status === 200) {
          // this.toastr.success('Successful!', 'แจ้งเตือน');
          this.resDatapostPrescription = response.data.filter((item: { an: string; }) => item.an === an);
          this.formatfrequencytime()
          this.resDatapostPrescription = this.getNextDoses();
          // console.log(this.resDatapostPrescription);
          // this.resDatapostPrescription
          const options2 = ['N', 'L', 'R', 'W'];
          const randomString = options2[Math.floor(Math.random() * options2.length)];

          this.resDatapostPrescription.forEach((items: { barcodevizen: string; usercheckDatetime: boolean }) => {
            const randomString = options2[Math.floor(Math.random() * options2.length)];
            items.barcodevizen = `${randomString}1234`,
              items.usercheckDatetime = false
          });
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


  onScanDrung(currentBarcodeDrug: string) {
    this.resDatapostPrescription.filter((item: { barcodevizen: string; }) => item.barcodevizen === currentBarcodeDrug).forEach((items: { usercheckDatetime: boolean; }) => {
      // const randomString = options2[Math.floor(Math.random() * options2.length)];
      items.usercheckDatetime = true
    });


    const timeOver = this.resDatapostPrescription.filter((item: { frequencytime: string; }) => this.isTimeOver(item.frequencytime) == true).length;
    const HAD = this.resDatapostPrescription.filter((item: { highalert: string; }) => item.highalert == '1').length;
    const userCheck = this.resDatapostPrescription.filter((item: { usercheckDatetime: string; }) => !item.usercheckDatetime).length;

    // console.log(timeOver);
    if (userCheck > 0) {
      // this.toastr.warning('กรุณาแสกนซองยาให้ครบ', 'แจ้งเตือน', {
      //   toastClass: 'custom-toast-warning',
      // });

    }
    else

      if (HAD > 0) {
        this.confirmDispenseHAD();

      } else


        if (timeOver > 0) {
          this.confirmDispenseError();
        } else {
          this.toastr.success('Successful!', 'แจ้งเตือน');
          this.resDataPatientadmit = [];
          this.resDatapostPrescription = [];
          this.hasScanned = false;
          this.focusInput();
          this.currentBarcode = '';
        }


    // this.currentBarcodeDrug = '';
    //   this.onFocus();
    //  console.log( this.resDatapostPrescription);

  }

  onFocus() {
    this.currentBarcode = '';
    this.currentBarcodeDrug = '';
    // this.focusInput2();
    // this.currentBarcodeDrug = '';
    // ทำอะไรบางอย่างเมื่อเคอร์เซอร์เข้ามา
  }

  formatfrequencytime() {
    this.resDataPatientadmit2.forEach((item: { frequencytime: string; }) => {
      if (item.frequencytime && item.frequencytime.length === 4) {
        // แทรก ":" ระหว่างชั่วโมงและนาที
        item.frequencytime = item.frequencytime.substring(0, 2) + ':' + item.frequencytime.substring(2) + ':' + '00';
      }
    });
  }


  onScanDrung2(currentBarcodeDrug: string) {

    const utcDate = new Date(Date.UTC(2025, 5, 19, 10, 30, 0));
    // if (this.bmedicinePRN || this.bmedicineStat) {
    //   const filteredItems = this.resTemDatapostPrescription.filter((item: { orderitembarcode: string; }) =>
    //     item.orderitembarcode == currentBarcodeDrug
    //   );
    //   filteredItems.forEach((items: {
    //     prepareuserid: string;
    //     prepareusername: string; preparedatetime: string;
    //   }) => {
    //     items.preparedatetime = String(utcDate.toISOString());
    //     items.prepareuserid = '1';
    //     items.prepareusername = "Robot";
    //   });

    //   // เก็บผลลัพธ์สุดท้าย
    //   this.resDatapostPrescription = filteredItems;

    //   // console.log(this.resDatapostPrescription);
    // } else {
    const timeOver = this.resDatapostPrescription.filter((item: { frequencytime: string; orderitembarcode: string; }) => this.isTimeOver(item.frequencytime) == true && item.orderitembarcode == currentBarcodeDrug).length;
    const HAD = this.resDatapostPrescription.filter((item: { highalert: string; orderitembarcode: string; }) => item.highalert == '1' && item.orderitembarcode == currentBarcodeDrug).length;

    // console.log(timeOver, HAD);
    // if (HAD > 0 && timeOver > 0) {
    //   console.log(1)
    //    this.confirmDispenseHAD(currentBarcodeDrug);
    //   //  this.confirmDispenseError();
    // }
    // else if (HAD > 0 && timeOver < 1) {
    //   console.log(2)
    //   this.confirmDispenseHAD(currentBarcodeDrug);
    // } else if (timeOver > 0 && HAD < 1) {
    //   console.log(3)
    //   this.confirmDispenseHAD(currentBarcodeDrug);
    // } else {
    //   this.resDatapostPrescription.filter((item: { orderitembarcode: string; }) => item.orderitembarcode === currentBarcodeDrug).forEach((items: {
    //     dispenseuserid: string;
    //     dispenseusername: string; dispensedatetime: string;
    //   }) => {
    //     items.dispensedatetime = String(utcDate.toISOString())
    //     items.dispenseuserid = '1'
    //     items.dispenseusername = "Robot"
    //   });
    // }

    // console.log(timeOver, HAD);
    if (HAD > 0) {
      console.log(1)
      this.confirmDispenseHAD(currentBarcodeDrug);
      //  this.confirmDispenseError();
    }
    else if (timeOver > 0) {
      this.confirmDispenseError(currentBarcodeDrug);
    } else {
      this.resDatapostPrescription.filter((item: { orderitembarcode: string; }) => item.orderitembarcode === currentBarcodeDrug).forEach((items: {
        dispenseuserid: string;
        dispenseusername: string; dispensedatetime: string;
      }) => {
        items.dispensedatetime = String(utcDate.toISOString())
        items.dispenseuserid = '1'
        items.dispenseusername = "Robot"
      });
    }

    // this.resDatapostPrescription.forEach((item: { prepareuserid: any; prepareusername: any; preparedatetime: any; }) => ({
    //       reciveuserid: '1',
    //       reciveusername:"Robot",
    //       recivedatetime: String(utcDate.toISOString())
    //   }));

    // const timeOver = this.resDatapostPrescription.filter((item: { frequencytime: string; }) => this.isTimeOver(item.frequencytime) == true).length;
    // const HAD = this.resDatapostPrescription.filter((item: { highalert: string; }) => item.highalert == '1').length;
    // const userCheck = this.resDatapostPrescription.filter((item: { usercheckDatetime: string; }) => !item.usercheckDatetime).length;
    this.currentBarcodeDrug = '';

    // }


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
        this.filteredMedications = this.resDatapostPrescription.filter((item: { sendmachine: string; }) =>
          item.sendmachine === "Y");
        break;
      case 'sticker':
        this.filteredMedications = this.resDatapostPrescription.filter((item: { sendmachine: string; }) =>
          item.sendmachine === "N");
        break;
      case 'overdue':
        this.filteredMedications = this.resDatapostPrescription.filter((item: { frequencytime: string; }) =>
          this.isTimeOver(item.frequencytime));
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
    return this.resDatapostPrescription.filter((item: { frequencytime: string; }) =>
      this.isTimeOver(item.frequencytime)).length;
  }

  canConfirm(): boolean {
    if (!this.resDatapostPrescription) return false;

    // Check if all medications have been scanned
    const allScanned = this.resDatapostPrescription.every((item: { recivedatetime: string; }) =>
      item.recivedatetime);

    // Check if there are any medications to confirm
    const hasMedications = this.resDatapostPrescription.length > 0;

    return allScanned && hasMedications;
  }

  // Update your existing getNextDoses() method to return filtered array
  getNextDoses(): any[] {
    if (!this.resDatapostPrescription) return [];

    this.formatfrequencytime();
    const currentMinutes = this.currentTime.getHours() * 60 + this.currentTime.getMinutes();

    const futureDoses = this.resDatapostPrescription.filter((med: { frequencytime: string; }) => {
      if (!med.frequencytime) return false;

      const [hours, minutes] = med.frequencytime.split(':').map(Number);
      const medMinutes = hours * 60 + minutes;

      return medMinutes >= currentMinutes;
    });

    if (futureDoses.length === 0) return [];

    const earliestTime = Math.min(...futureDoses.map((med: { frequencytime: string; }) => {
      const [h, m] = med.frequencytime.split(':').map(Number);
      return h * 60 + m;
    }));

    return futureDoses.filter((med: { frequencytime: string; }) => {
      const [h, m] = med.frequencytime.split(':').map(Number);
      return (h * 60 + m) === earliestTime;
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

}
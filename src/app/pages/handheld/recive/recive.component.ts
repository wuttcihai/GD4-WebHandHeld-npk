import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Renderer2,
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
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
// import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
export interface SelectPopup {
  label: string;
  value: string;
}
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
  currentBarcodeDrug = '';
  showScanFeedback = false;
  isMobile = false;
  patientadmits: any;
  hiddenSearch: boolean = false;
  currentTime = new Date();
  scanFocus: boolean = true;
  statusColor: string = '#4CAF50'; // Default status color (green)
  statusMessage: string = 'Ready to scan'; // Default status message
  scanSuccess: boolean = false; // Tracks scan success state
  scanMessage: string = ''; // Feedback message for scans
  // currentTime: Date = new Date(); // Current time for display
  groupedData: { [key: string]: any[] } = {};
  medications: any[] = [];
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
  resDataPatientadmit2: any;
  resDataPatientadmitSel: any;
  resDatapostPrescription: any;
  timeFilter: string = 'all';
  filteredMedications: any[] = [];
  lenSticker: any;

  lenPack: any;
  // loading: boolean;
  dataSource: any;
  ngOnInit() {
    // Simulate loading data
    this.onScanAN2();
    setTimeout(() => {
      this.patient.status = 'stable';
    }, 1500);
  }

  constructor(
    private renderer: Renderer2,
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
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (
      event.key === '/' &&
      event.target !== this.medicationInput.nativeElement
    ) {
      event.preventDefault();
      this.focusInput();
    }
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
    this.currentBarcode = '';
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

  showConfirmationToast() {
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
      let resDataz = this.resDatapostPrescription.map(
        (item: {
          _id: any;
          reciveuserid: any;
          reciveusername: any;
          recivedatetime: any;
        }) => ({
          _id: item._id,
          updatestatus: {
            reciveuserid: item.reciveuserid,
            reciveusername: item.reciveusername,
            recivedatetime: item.recivedatetime,
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
      // console.log(this.resDatapostPrescription)
    }

    // You might use a library like ngx-toastr or create a custom toast component
  }

  onScanAN2() {
    const q = {
      wardcode: this.WARD.wardcode,
      recivedatetime: null,
      checkoutdatetime: { $ne: null },
    };
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

          console.log(response.data);
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

  onClickPatient(an: string) {
    console.log(an);
    this.currentBarcodeDrug = '';
    this.resDataPatientadmitSel = this.resDataPatientadmit2.find(
      (item: { prescriptionno: string }) => item.prescriptionno === an
    );
    this.handheldService
      .postpatientadmitpackage({
        prescriptionno: an,
        recivedatetime: null,
      })
      .subscribe({
        next: (response) => {
          // console.log(response);

          if (response.status === 200) {
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

            console.log(this.groupedData);
            // }
            // console.log(this.lenPack);
            // this.lenSticker == response.data.filter((item: { sendmachine: string; }) => item.sendmachine == "N").length;
            // this.toastr.success('Successful!', 'แจ้งเตือน');
            // this.resDataPatientadmit = response.data.find((item: { an: string; }) => item.an === an);
            this.timeFilter = 'all';
            this.updateFilteredMedications();
            this.hasScanned = true;
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
  onScanDrung(currentBarcodeDrug: string) {
    console.log(this.groupedData);
    const utcDate = new Date(Date.UTC(2025, 5, 19, 10, 30, 0));
    console.log(this.resDatapostPrescription);

    this.resDatapostPrescription
      .filter((item: { orderitembarcode: string; orderitembarcodecase?: any }) => {
        if (Array.isArray(item.orderitembarcodecase) && item.orderitembarcodecase.length > 0) {
          return item.orderitembarcodecase.includes(currentBarcodeDrug);
        } else {
          return item.orderitembarcode === currentBarcodeDrug;
        }
      })
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
    console.log(this.resDatapostPrescription);
    // const timeOver = this.resDatapostPrescription.filter((item: { frequencytime: string; }) => this.isTimeOver(item.frequencytime) == true).length;
    // const HAD = this.resDatapostPrescription.filter((item: { highalert: string; }) => item.highalert == '1').length;
    // const userCheck = this.resDatapostPrescription.filter((item: { usercheckDatetime: string; }) => !item.usercheckDatetime).length;
    this.currentBarcodeDrug = '';

    const countReceived = this.resDatapostPrescription.filter(
      (item: { reciveuserid: any }) =>
        item.reciveuserid != null && item.reciveuserid !== ''
    ).length;

    // Auto update when recieve all
    if (countReceived === this.resDatapostPrescription.length) {
      this.showLoginBeforeConfirm();
      // เพิ่มครบก่อนแล้ว login
      //this.confirmAllMedications();

    }
    console.log('Count of reciveuserid not null:', countReceived);
  }



  showLoginBeforeConfirm() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        const username = result.username || 'Robot';
        const userid = result.userid || '1';

        // 🔄 อัปเดตข้อมูล user ให้กับทุกรายการที่มี recivedatetime
        this.resDatapostPrescription.forEach((item: any) => {
          if (item.recivedatetime) {
            item.reciveuserid = userid;
            item.reciveusername = username;
          }
        });

        this.confirmAllMedications();
      } else {
        console.warn('ยกเลิก Login ก่อนบันทึก');
      }
    });
  }
  onFocus() {
    this.currentBarcode = '';
    this.currentBarcodeDrug = '';
    // this.focusInput2();
    // this.currentBarcodeDrug = '';
    // ทำอะไรบางอย่างเมื่อเคอร์เซอร์เข้ามา
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
}

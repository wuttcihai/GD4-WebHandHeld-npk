import { Component, Inject, OnInit, ChangeDetectorRef, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
interface Field {
  key: string;
  label: string;
  placeholder: string;
  value?: any;
  type: string;
  options?: Observable<{ label: string, value: number }[]>;
  formControl?: FormControl;
}
@Component({
  selector: 'app-popup',
  standalone: false,

  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'

})
export class PopupComponent implements OnInit {
  @Output() clickOutside = new EventEmitter<void>();
  inputdata: any;
  closemessage = 'closed';
  checked = false;
  disabled = false;
  filteredOptions: { [key: string]: Observable<any[]> } = {};
  // datadrug: any[] = []; 
  datadrug2 = [];

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>, private builder: FormBuilder) { }
  constructor
    (@Inject(MAT_DIALOG_DATA)
    public data: any,
      private ref: MatDialogRef<PopupComponent>,
      private http: HttpClient,
      private toastr: ToastrService,
      private cdr: ChangeDetectorRef,
      private elementRef: ElementRef
    ) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
  ngOnInit(): void {
    this.inputdata = this.data;
    this.datadrug2 = this.inputdata.options.datadrug
    // console.log(this.data);



    // กำหนดค่าให้ autocomplete field
    // this.data.fields.forEach((field: { type: string; formControl: FormControl<any>; key: string; }) => {
    //   if (field.type === 'autocomplete') {
    //     field.formControl = new FormControl();
    //     this.filteredOptions[field.key] = field.formControl.valueChanges.pipe(
    //       startWith(''),
    //       map(value => this._filter(value, field.key))
    //     );
    //   }
    // });

    // this.data.fields.forEach((field: { 
    //   type: string; 
    //   formControl: FormControl<any>; 
    //   key: string; 
    //   value?: any;  // เพิ่ม field value ใน type definition
    // }) => {
    //   if (field.type === 'autocomplete') {
    //     // กำหนดค่าเริ่มต้นจาก field.value ถ้ามี
    //     field.formControl = new FormControl(field.value || ''); // ใช้ field.value เป็นค่าเริ่มต้น

    //     this.filteredOptions[field.key] = field.formControl.valueChanges.pipe(
    //       startWith(field.value || ''), // เริ่มด้วยค่าเริ่มต้นจาก field.value
    //       map(value => this._filter(value, field.key))
    //     );
    //   }
    // });
    // ใน ngOnInit() แก้ไขส่วนนี้
    // ใน ngOnInit() แก้ไขส่วนนี้
    // ใน ngOnInit()
    this.data.fields.forEach((field: { type: string; formControl: FormControl<any>; key: string; value?: any }) => {
      if (field.type === 'autocomplete') {
        // หาค่าเริ่มต้นที่ตรงกับ options
        const initialValue = this.getInitialValue(field.value, field.key);
        field.formControl = new FormControl(initialValue);

        this.filteredOptions[field.key] = field.formControl.valueChanges.pipe(
          startWith(''), // เริ่มด้วยค่าว่างเพื่อแสดง options ทั้งหมด
          map(value => this.filterOptions(value, field.key))
        );
      }
    });

    this.cdr.detectChanges();
  }

  private getInitialValue(value: any, key: string): any {
    if (!value) return null;

    const options = this.getOptionsByKey(key);

    // ถ้า value เป็น object ที่มีโครงสร้างตรงกับ options
    if (typeof value === 'object' && value.value) {
      return options.find(opt => opt.value === value.value) || value;
    }

    // ถ้า value เป็น string
    if (typeof value === 'string') {
      return options.find(opt => opt.value === value || opt.label === value);
    }

    return null;
  }

  // ngOnInit(): void {
  //   this.inputdata = this.data;
  //   this.datadrug = this.inputdata.options.datadrug;  // ตรวจสอบว่า datadrug มีข้อมูล

  //   console.log(this.datadrug);  // ดูว่ามีข้อมูลใน datadrug

  //   // กำหนดค่าให้ autocomplete field
  //   this.data.fields.forEach((field: { type: string; formControl: FormControl<any>; key: string; }) => {
  //     if (field.type === 'autocomplete') {
  //       field.formControl = new FormControl();  // สร้าง FormControl สำหรับ autocomplete

  //       // สร้าง filteredOptions สำหรับการกรองข้อมูล
  //       this.filteredOptions[field.key] = field.formControl.valueChanges.pipe(
  //         startWith(''),  // เริ่มต้นด้วยค่าว่าง
  //         map(value => this._filter(value, field.key))  // เรียกใช้ฟังก์ชัน _filter
  //       );
  //     }
  //   });
  // }

  // private _filter(value: string, key: string): any[] {
  //   const filterValue = value?.toLowerCase() || '';
  // console.log(filterValue, value)
  //   // ถ้า key เป็น "drugCode" ให้ดึงข้อมูลจาก datadrug
  //   if (key === "drugCode" || key === "orderitemcode") {
  //     // console.log(value); // สำหรับ debug
  //     return this.datadrug2.filter((option: { value: string; label: string }) =>
  //       option.value.toLowerCase().includes(filterValue) || 
  //       (option.label && option.label.toLowerCase().includes(filterValue))
  //     );
  //   }

  //   // ถ้าไม่ใช่ key "drugCode" ให้ดึงข้อมูลจาก this.data.options[key]
  //   return this.data.options[key].filter((option: { label: string; value: string }) =>
  //     option.label.toLowerCase().includes(filterValue.toLowerCase()) || 
  //     option.value.toLowerCase().includes(filterValue.toLowerCase())
  //   );
  // }

  private filterOptions(value: any, key: string): any[] {
    if (key === "drugCode" || key === "orderitemcode") {
      // console.log(value); // สำหรับ debug
      const filterValue = value?.toLowerCase() || '';
      return this.datadrug2.filter((option: { value: string; label: string }) =>
        option.value.toLowerCase().includes(filterValue) ||
        (option.label && option.label.toLowerCase().includes(filterValue))
      );
    } else {
      const options = this.getOptionsByKey(key);

      // ถ้าไม่มีค่าที่กรอก หรือกรอกค่าว่าง ให้แสดง options ทั้งหมด
      if (!value || value === '') {
        return options;
      }
  
      // ถ้า value เป็น object (ค่าที่เลือกแล้ว)
      if (typeof value === 'object') {
        const filterValue = value.label?.toLowerCase() || '';
        return options.filter(option =>
          option.label.toLowerCase().includes(filterValue)
        );
      }
  
      // กรณี value เป็น string (จากการพิมพ์)
      const filterValue = value.toLowerCase();
      return options.filter(option =>
        option.label.toLowerCase().includes(filterValue) ||
        option.value.toString().toLowerCase().includes(filterValue)
      );
    }

  }

  private getOptionsByKey(key: string): any[] {
    return key === "drugCode" || key === "orderitemcode"
      ? this.datadrug2
      : this.data.options[key] || [];
  }

  // private _filter(value: string, key: string): any[] {

  //   if (key === "drugCode") {
  //     console.log(value); // สำหรับ debug
  //     return this.datadrug.filter((option: { label: string; }) =>
  //       option.label.toLowerCase().includes(filterValue)
  //     );
  //   }
  //   const filterValue = value?.toLowerCase() || '';
  //   return this.data.options[key].filter((option: { label: string; }) =>
  //     option.label.toLowerCase().includes(filterValue)
  //   );
  // }


  // displayFn(option: any): string {
  //   // console.log(option);
  //   // console.log(this.inputdata.elements.datadrug.filter((item: any) => item.orderitemcode.includes(option.value)[0]));
  //   return option ? option.label : '';
  // }

  displayFn(option: any): string {
    if (!option) return '';
    return option?.label || option;
  }
  // defaultOption = { value: '0', label: 'ปกติ' };

  saveData() {
    let authorizedData: never[] = [];
    const resultData = this.data.fields.reduce((acc: any, field: Field) => {
      let value;

      if (field.type === 'autocomplete') {
        const useLabel = this.data.useLabel[field.key] ?? true;
        value = field.formControl?.value
          ? useLabel
            ? field.formControl.value.label
            : field.formControl.value.value
          : null;
        authorizedData = field?.formControl?.value?.value
        // console.log(authorizedData);
      } else {
        value = field.value;
      }

      if (field.type === 'number') {
        value = Number(value);
        if (isNaN(value)) {
          alert(`Invalid value for ${field.label}. Expected a number.`);
          return null;
        }
      } else if (field.type === 'boolean') {
        value = value === true || value === 'true';
      }

      if (field.key === 'isEnabled' || field.type === 'isEnabled') {
        acc[field.key] = value ? 'Y' : 'N';
        // } else if (field.key === 'authorized' && field.type === 'array') {
        //   acc[field.key] = field?.formControl?.value?.value ?? [];
      } else {
        acc[field.key] = value;
      }

      if (field.key === 'authorized' && field.type === 'manageuserscomponent') {
        // console.log('if',authorizedData)
        acc[field.key] = authorizedData.map((item: any) => item.sidebar_id);
      }

      // acc[field.key] = value;
      // acc[field.key] = field.key === 'isEnabled' ? (value ? 'Y' : 'N') : value;
      // acc[field.key] = field.type === 'isEnabled' ? (value ? 'Y' : 'N') : value;
      // acc[field.key] = field.key === 'authorized' && field.type === 'array' ? field?.formControl?.value?.value : value;
      // console.log(acc);
      return acc;
    }, {});

    if (!resultData) {
      return;
    }
    console.log('Sending Data:', resultData);
    if (this.data.apiUrl.length > 0) {
      this.http.post(this.data.apiUrl, resultData).subscribe({
        next: response => {
          this.toastr.success('Successful!', 'แจ้งเตือน');
          this.ref.close(resultData);
        },
        error: error => {
          this.toastr.warning(error, 'แจ้งเตือน', {
            toastClass: 'custom-toast-warning',
          });
        }
      });
    } else {
      this.ref.close(resultData);
    }

  }

  // ฟังก์ชันตรวจสอบประเภทข้อมูล
  getExpectedType(type: string): string {
    switch (type) {
      case 'string':
        return 'string';
      case 'isEnabled':
        return 'string';
      case 'boolean':
        return 'boolean';
      case 'number':
        return 'number';
      default:
        return 'string'; // default type คือ string
    }
  }


  isFormValid(formData: { [key: string]: any }): boolean {
    for (const key in formData) {
      if (!formData[key]) {
        return false;
      }
    }
    return true;
  }

  closepopup() {
    // console.log('Close')
    this.ref.close('Close');
  }
  fetchDrugCodes(searchTerm: string): Observable<any[]> {
    const url = `http://127.0.0.1:6425/setting/devicedrugmanage/msdugs/all`;  // เปลี่ยน URL ให้ตรงกับ API ที่คุณใช้
    return this.http.get<any[]>(url);  // ส่งคำขอ GET เพื่อดึงข้อมูล
  }
  // myform = this.builder.group({
  //   name: this.builder.control('')
  // });


}

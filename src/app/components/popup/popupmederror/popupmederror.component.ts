import { Component, Inject, OnInit, ChangeDetectorRef, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, of } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HandheldService } from '../../../service/handheld/handheld.service';

@Component({
  selector: 'app-popupmederror',
  standalone: false,

  templateUrl: './popupmederror.component.html',
  styleUrl: './popupmederror.component.scss'
})
export class PopupmederrorComponent {
  adddata: any[] = [];
  fullOptions: { [key: string]: any[] } = {};
  filteredOptions: { [key: string]: Observable<any[]> } = {};
  fields: any[] = [];
  constructor
    (private ref: MatDialogRef<PopupmederrorComponent>,
      @Inject(MAT_DIALOG_DATA)
      public data: any,
      private http: HttpClient,
      // private toastr: ToastrService,
      private cdr: ChangeDetectorRef,
      private elementRef: ElementRef
    ) { }
  onSelectDesc(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;

    const index = this.data.fields.findIndex((f: any) => f.key === 'mederror_desc');
    if (index > -1) {
      this.data.fields[index].value = value.label;
    } else {
      this.data.fields.push({ key: 'mederror_desc', value });
    }
  }
  ngOnInit() {
    this.fields = this.data.fields;

    this.fullOptions = this.data.options || {}; // เช่น { mederror_desc: [...] }
    this.filteredOptions = {};

    this.fields.forEach((field: any) => {
      // สร้าง FormControl ถ้ายังไม่มี
      if (!field.formControl) {
        field.formControl = new FormControl(field.value || '');
      }

      // เตรียม filteredOptions สำหรับ autocomplete
      if (field.type === 'autocomplete') {
        this.filteredOptions[field.key] = of(this.fullOptions[field.key] || []);
      }
    });
  }
  async saveData() {
    let authorizedData: never[] = [];
    const dataObj: any = {
      "_id_prescription": null,
      "prescriptionno": null,
      "hn": null,
      "an": null,
      "orderitemcode": null,
      "orderitemname": null,
      "orderunitdesc": null,
      "orderqty": null,
      "shelfzone": null,
      "shelfname": null,
      "jobuserid": null,
      "jobusername": null,
      "mederror_desc": null,
      "mederror_freetext": null,
      "mederror_robot": null,
      "mederror_userid": localStorage.getItem('usercode'),
      "mederror_username": localStorage.getItem('username'),
      "mederror_type": "ERT003"
    };

    this.adddata = [];
    // for (const field of this.data.fields) {
    //   if (dataObj.hasOwnProperty(field.key.trim())) {
    //     dataObj[field.key] = field.value;
    //   }
    // }

    this.adddata.push(dataObj);


    try {
      // const response = await this.apiService.postupdatemederror(this.adddata).toPromise();
      // console.log('Inserted:', response);
      // this.ref.close('confirm');

    } catch (err) {
      console.error('Error inserting:', err);
    }

  }
  displayFn(option: any): string {
    if (!option) return '';
    return option?.label || option;
  }
  closepopup() {
    // console.log('Close')
    this.ref.close('Close');
  }
  onAutocompleteInput(key: string) {
    const field = this.fields.find((f: any) => f.key === key);
    const control = field?.formControl;

    if (!control || !this.fullOptions[key]) {
      this.filteredOptions[key] = of([]);
      return;
    }

    const inputValue = control.value?.toLowerCase() || '';
    this.filteredOptions[key] = of(
      this.fullOptions[key].filter((option: any) =>
        option.label.toLowerCase().includes(inputValue)
      )
    );
  }
}




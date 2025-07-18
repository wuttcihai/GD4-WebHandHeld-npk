import { Component, Inject, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
// import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
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
  selector: 'app-popupselecttimerange',
  standalone: false,

  templateUrl: './popupselecttimerange.component.html',
  styleUrl: './popupselecttimerange.component.scss'
})
export class PopupselecttimerangeComponent implements OnInit {
  @Output() clickOutside = new EventEmitter<void>();
  @Output() timeRangeChange = new EventEmitter<{ start: string, end: string }>();
  inputdata: any;
  closemessage = 'closed';
  checked = false;
  disabled = false;
  filteredOptions: { [key: string]: Observable<any[]> } = {};
  // datadrug: any[] = []; 
  datadrug2 = [];
  timeForm = new FormGroup({
    startTime: new FormControl(this.getNextHour()),
    endTime: new FormControl(this.getNextHour(1))
  });

  timeOptions = this.generateTimeOptions();
  constructor
    (@Inject(MAT_DIALOG_DATA)
    public data: any,
      private ref: MatDialogRef<PopupselecttimerangeComponent>,
      private http: HttpClient,
      private toastr: ToastrService,
      private cdr: ChangeDetectorRef,
      private elementRef: ElementRef
    ) {
      this.timeForm.valueChanges.subscribe(values => {
        if (values.startTime && values.endTime) {
          this.timeRangeChange.emit({
            start: values.startTime,
            end: values.endTime
          });
        }
      });
  }
  selectedValueend: string = '';
  selectedValuestart: string = '';
  options = [
    { value: '01:00:00', label: '01:00:00' },
    { value: '02:00:00', label: '02:00:00' },
    { value: '03:00:00', label: '03:00:00' },
    { value: '04:00:00', label: '04:00:00' },
    { value: '05:00:00', label: '05:00:00' },
    { value: '06:00:00', label: '06:00:00' },
    { value: '07:00:00', label: '07:00:00' },
    { value: '08:00:00', label: '08:00:00' },
    { value: '09:00:00', label: '09:00:00' },
    { value: '10:00:00', label: '10:00:00' },
    { value: '11:00:00', label: '11:00:00' },
    { value: '12:00:00', label: '12:00:00' },
    { value: '13:00:00', label: '13:00:00' },
    { value: '14:00:00', label: '14:00:00' },
    { value: '15:00:00', label: '15:00:00' },
    { value: '16:00:00', label: '16:00:00' },
    { value: '17:00:00', label: '17:00:00' },
    { value: '18:00:00', label: '18:00:00' },
    { value: '19:00:00', label: '19:00:00' },
    { value: '20:00:00', label: '20:00:00' },
    { value: '21:00:00', label: '21:00:00' },
    { value: '22:00:00', label: '22:00:00' },
    { value: '23:00:00', label: '23:00:00' },
    { value: '00:00:00', label: '00:00:00' }
];

  ngOnInit(): void {
    this.inputdata = this.data;
    this.datadrug2 = this.inputdata.options.datadrug
  }

    onOkay() {
    // console.log('Close')
    let resData ={
      selectedValuestart:this.selectedValuestart,
      selectedValueend:this.selectedValueend
    }
    this.ref.close(resData);
  }

  closepopup() {
    // console.log('Close')
    this.ref.close('Close');
  }

  private getNextHour(hoursToAdd = 0): string {
    const now = new Date();
    now.setHours(now.getHours() + hoursToAdd, 0, 0, 0);
    return now.toTimeString().substring(0, 5);
  }

  private generateTimeOptions(): string[] {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
  }
}

import { Component, Inject, OnInit, ChangeDetectorRef, EventEmitter, Output, HostListener, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
export interface TableDetial {
  takedate: string;
  orderitemname: string;
  dosage: string;
  frequencyTime: string;
  freetext1: string;
  freetext2: string;
  freetext3: string;
  DispenseUserID: string;
  DispenseDatetime: string;
  DispenseUserName: string;
  frequencyTimedesc: string;
  userRecivedatetime: string;
  userReciveusername: string;

  confirndatetime: string;
  confirnusername: string;

  mederror_desc: string;
  mederror_freetext: string;
  // shelfdesc: string;
}

@Component({
  selector: 'app-popuprectiveshelfdesc',
  standalone: false,

  templateUrl: './popuprectiveshelfdesc.component.html',
  styleUrl: './popuprectiveshelfdesc.component.scss'
})

export class PopuprectiveshelfdescComponent {
  [x: string]: any;

  @Output() clickOutside = new EventEmitter<void>();
  inputdata: any;
  closemessage = 'closed';
  checked = false;
  disabled = false;
  filteredOptions: { [key: string]: Observable<any[]> } = {};
  loading: boolean = false;
  // displayedColumns: string[] = [
  //   'userRecivedatetime',
  //   'userReciveusername',
  //   'takedate',
  //   'orderitemname',
  //   'dosage',
  //   'frequencyTime',
  //   'frequencyTimedesc',
  //   'DispenseDatetime',

  //   'DispenseUserName',
  //   'confirndatetime',
  //   'confirnusername',
  //   'mederror_desc',
  //   'mederror_freetext',
  // ];
  // dataSource: MatTableDataSource<TableDetial> = new MatTableDataSource<TableDetial>();
  // @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  // @ViewChild(MatSort) sort: MatSort | null = null;

  filterData: any[] = [];
  shelfsData: any[] = [];
  selectedShelf: any = null;

  constructor
    (@Inject(MAT_DIALOG_DATA)
    public data: any,
      private ref: MatDialogRef<PopuprectiveshelfdescComponent>,
      private cdr: ChangeDetectorRef,
    ) { }



  ngOnInit(): void {
    this.loading = true;
    this.inputdata = this.data;
    this.filterData = this.inputdata.fields.filterData;
    this.shelfsData = this.inputdata.fields.shelfsData


  }


  getShelfIcon(desc: string): string {
    const iconMap: { [key: string]: string } = {
      'รถเข็นยาฉุกเฉิน': 'fas fa-ambulance',
      'ห้องผู้ป่วย': 'fas fa-procedures',
      'ตู้เก็บยา(WARD)': 'fas fa-archive',
      'ห้องทรีทเมนต์': 'fas fa-clinic-medical',
      'ตู้เย็น': 'fas fa-snowflake',
      'อยู่ลิ้นชัก': 'fas fa-archive',
      'รถเข็นจ่ายยา': 'fas fa-truck'
    };
    return iconMap[desc] || 'fas fa-box';
  }

  selectShelf(shelf: any) {
    this.selectedShelf = shelf;
    // console.log('Selected shelf:', shelf);
  }

  confirmSelection() {
    if (this.selectedShelf) {
      const selection = {
        medication: this.filterData[0],
        shelf: this.selectedShelf
      };
      console.log('Confirmed selection:', selection);
      // Here you would typically send this data to a service
      alert(`เลือกเก็บยา ${this.filterData[0].orderitemname} ที่ ${this.selectedShelf.shelfdesc} เรียบร้อยแล้ว`);
    }
  }



  closepopup() {
    // console.log('Close')
    this.ref.close('Close');
  }
  convertDateAndAddHours(dateString: string, format: 'date' | 'time' | 'datetime'): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    date.setHours(date.getHours() + 7);

    if (format === 'date') {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear() + 543;
      return `${day}/${month}/${year}`;
    } else if (format === 'time') {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    return '';
  };

}

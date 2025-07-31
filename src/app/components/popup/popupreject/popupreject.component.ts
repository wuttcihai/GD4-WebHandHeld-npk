import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import dayjs from 'dayjs';

@Component({
  selector: 'app-popupreject',
  standalone: false,

  templateUrl: './popupreject.component.html',
  styleUrl: './popupreject.component.scss'
})
export class PopuprejectComponent {

  remark: string = '';
  selectedIds: any[] = [];
  constructor(public dialogRef: MatDialogRef<PopuprejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSave(): void {

    // console.log(this.data)
    // if (localStorage.getItem('isLoggedIn') === 'true') {
    //   const thaiTime = dayjs().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');


    //   this.apiService.postupdatestatus(this.data).subscribe(response => {
    //     let d = response
    //     console.log(d)
    //   });

    // }

    this.dialogRef.close({
      confirmed: true,
      remark: this.remark
    });
    //this.dialogRef.close(this.remark); // ส่งค่ากลับ
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
    //this.dialogRef.close(null); // ปิดโดยไม่ส่งค่า
  }
}

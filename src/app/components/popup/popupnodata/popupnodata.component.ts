import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-popupnodata',
  standalone: false,
  templateUrl: './popupnodata.component.html',
  styleUrl: './popupnodata.component.scss'
})
export class PopupnodataComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupnodataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onSave(): void {
    this.dialogRef.close(); // ส่งค่ากลับ
  }
  onCancel(): void {
    this.dialogRef.close(null); // ปิดโดยไม่ส่งค่า
  }
}

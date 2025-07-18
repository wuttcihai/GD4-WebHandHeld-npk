import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  standalone: false,

  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  constructor
    (@Inject(MAT_DIALOG_DATA)
    public data: any,
      private ref: MatDialogRef<NotificationComponent>,
      private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    // console.log(this.data);

    this.cdr.detectChanges();
  }

  notificationNO() {
    this.ref.close(false);
  }


  notificationOK() {
    this.ref.close(true);
  }

}

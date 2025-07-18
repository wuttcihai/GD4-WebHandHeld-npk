import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recive-msg',
  templateUrl: './recive-msg.component.html',
  styleUrls: ['./recive-msg.component.scss'],
  standalone: false,
})
export class ReciveMsgComponent implements OnInit {
  constructor(private ref: MatDialogRef<ReciveMsgComponent>) {}

  value: any;

  ngOnInit() {}

  savedata() {
    this.ref?.close(this.value);
  }
  closedialog() {
    this.ref?.close();
  }
}

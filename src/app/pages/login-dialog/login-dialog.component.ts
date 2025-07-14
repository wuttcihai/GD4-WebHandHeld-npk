import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  standalone: false,

  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  username: string = '';
  password: string = '';

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>) { }

  onCancel() {
    this.dialogRef.close();
  }

  onLogin() {
    // จำลองการตรวจสอบ password
    if (this.username && this.password === '1234') {
      this.dialogRef.close({ success: true, username: this.username, userid: '00001' });
    } else {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  }
}
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../service/auth/auth.service';
import { saveAs } from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-dialog',
  standalone: false,

  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  @ViewChild('BarcodeDrug') BarcodeDrug!: ElementRef;
  username: string = '';

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  async onLogin(event: any) {
    // จำลองการตรวจสอบ password
    const barcode = event.target.value;
    if (barcode && barcode.includes('|')) {
      const parts = barcode.split('|');
      this.BarcodeDrug.nativeElement.value = '';
      if (parts[0] === 'gd4') {
        this.username = barcode.replace('gd4|', '');
        // console.log('Decryption started for:', this.username);
        const response = await this.authService.decrypt(this.username);
        // alert('Decryption Successful: ' + response);
        // console.log(response);
        if (response != null) {
          // const user = await this.authService.masterlogin(response);
          // alert('Master Login Successful: ' + user.status);
          // console.log(user);
          // if (user.status === 200) {
          //   alert('เข้าสู่ระบบสำเร็จ ');
          this.dialogRef.close(response);
        } else {
          alert('ข้อมูลไม่ถูกต้อง 3 กรุณาแสกนบัตรเจ้าหน้าที่อีกครั้ง');
        }
      } else {
        alert('ข้อมูลไม่ถูกต้อง 2 กรุณาแสกนบัตรเจ้าหน้าที่อีกครั้ง');
      }
    } else {
      alert('ข้อมูลไม่ถูกต้อง 1 กรุณาแสกนบัตรเจ้าหน้าที่อีกครั้ง');
    }

    this.BarcodeDrug.nativeElement.value = '';
  }
  hideKeyboard(): void {
    if (this.BarcodeDrug && this.BarcodeDrug.nativeElement) {
      this.BarcodeDrug.nativeElement.value = ''; // Clear input value
      this.BarcodeDrug.nativeElement.blur();
    }
  }
}

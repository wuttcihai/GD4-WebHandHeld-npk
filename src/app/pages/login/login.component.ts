import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import {ChangeDetectionStrategy, Component, signal,OnInit} from '@angular/core';
export interface DeviceSelect {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  watermarkUrl: string;
  username = '';
  password = '';
  errorMessage = '';
  loading: boolean = false;

  foodControl = new FormControl();  //this.foods[0].value  ค่าเริ่มต้น
  form = new FormGroup({
    devices: this.foodControl,
  });
  devices = [
    { value: 'Ward1', viewValue: 'Ward 1' },
    { value: 'Ward2', viewValue: 'Ward 2' },
    { value: 'Ward3', viewValue: 'Ward 3' }
  ];
  
  selectedDevice = '';
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.watermarkUrl = `${window.location.origin}/Document/dist/img/logo6.png`;
  }

  ngOnInit(): void { }
  onLogin() {
    window.location.href = '/dispense';
  }
  // onLogin() {
  //   // console.log('Before Login:', this.username, this.password);
  //   this.loading = true;
  //   if (this.username && this.password) {
  //     this.authService.login(this.username, this.password).subscribe({
  //       next: (response) => {
  //         // console.log(response.status);
  //         if (response.status == 200) {
  //           this.toastr.success('Login Successful!', 'แจ้งเตือน');
  //           setTimeout(() => {
  //             this.loading = false;
  //             window.location.href = '/home';
  //           }, 1500);
  //         } else {
  //           this.toastr.error(response.data, 'แจ้งเตือน');
  //           this.loading = false;
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Login Failed:', err);
  //         this.toastr.error('Invalid username or password', 'Error');
  //       },
  //     });
  //   } else {
  //     this.toastr.warning('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'แจ้งเตือน', {
  //       toastClass: 'custom-toast-warning',
  //     });
  //     this.loading = false;
  //   }
  // }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  applyFilter2(filterValue: string) {
    // console.log(filterValue)
    // const value = filterValue.trim().toLowerCase();
    // this.dataSource.filter = value;

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  status: number;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://127.0.0.1:6427/auth/permissions/login';
  apiUrl =
    localStorage.getItem('pharmacycode') == 'OPD'
      ? environment.apiURLopd
      : environment.apiURLipd;
  private sessionTimeout: any;
  private sessionDuration = 600 * 60 * 1000;

  constructor(private http: HttpClient, private toastr: ToastrService) {}
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  decrypt(encryptedData: string) {
    // Implement your decryption logic here
    return this.http
      .get<string>(`${this.apiUrl}/card/decrypt/${encryptedData}`, {
        headers: this.reqHeader,
      })
      .toPromise();
  }

  masterlogin(user: string) {
    const body = { username: `'${user.toUpperCase()}'` };
    return this.http
      .post<any>(`${this.apiUrl}/master/login/user`, body, {
        headers: this.reqHeader,
      })
      .toPromise();
  }
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const res = this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/permissions/login`,
      body
    );
    res.subscribe({
      next: (response) => {
        // console.log(response);
        if (response.status == 200) {
          const expireTime = Date.now() + this.sessionDuration;
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('pharmacycode', 'OPD');

          sessionStorage.setItem(
            'user',
            JSON.stringify(response.data[0].username)
          );
          sessionStorage.setItem('expire', expireTime.toString());

          this.setSessionTimeout();
        } else {
        }
      },
      error: (err) => {
        console.error('Login Failed:', err);
      },
    });
    return res;
  }

  isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    const expireTime = parseInt(sessionStorage.getItem('expire') || '0', 10);
    if (Date.now() > expireTime) {
      this.logout();
      return false;
    }
    return user !== null;
  }

  logout(): void {
    clearTimeout(this.sessionTimeout);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('expire');
    sessionStorage.removeItem('pharmacycode');
    this.toastr.warning('Session Expire', 'แจ้งเตือน', {
      toastClass: 'custom-toast-warning',
    });
    // setTimeout(() => {
    //   window.location.href = '/login';
    // }, 1500);
    // this.router.navigate(['/login']);
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  private setSessionTimeout(): void {
    clearTimeout(this.sessionTimeout);
    const expireTime = parseInt(sessionStorage.getItem('expire') || '0', 10);
    const timeLeft = expireTime - Date.now();

    if (timeLeft > 0) {
      this.sessionTimeout = setTimeout(() => this.logout(), timeLeft);
    }
  }
}

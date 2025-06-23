import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

interface DeviceResponse {
  status: number;
  data?: any;
}
@Injectable({
  providedIn: 'root',
})
export class StockService {
  // private apiUrl = 'http://127.0.0.1:6427/setting/devicedrugmanage/device/all';
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getStockDihAll(): Observable<DeviceResponse> {
    return this.http.get<DeviceResponse>(`${this.apiUrl}/dih/getstockdihall`).pipe(
      tap((response: { status: number; }) => {
        if (response.status === 200) {
          // this.toastr.success('Successful!', 'แจ้งเตือน');
        }
      }),
      catchError(error => {
        // this.toastr.warning(error, 'แจ้งเตือน', {
        //   toastClass: 'custom-toast-warning',
        // });
        return throwError(error);
      })
    );
  }
}

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
export class ReportService {
  // private apiUrl = 'http://127.0.0.1:6427/setting/devicedrugmanage/device/all';
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getWorkload(resultData: any): Observable<DeviceResponse> {
    return this.http.post<DeviceResponse>(`${this.apiUrl}/report/workload/all`, resultData).pipe(
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

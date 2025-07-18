import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

interface DeviceResponse {
  status: number;
  data?: any;
}
@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  // private apiUrl = 'http://127.0.0.1:6427/setting/devicedrugmanage/device/all';
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;

  constructor(private http: HttpClient, private toastr: ToastrService) { }


  // getSearchMedicineBasket(): Observable<any> {
  //   // console.log(`${this.apiUrl}/setting/devicedrugmanage/msdugs/all`)
  //   const res = this.http.get<DeviceResponse>(`${this.apiUrl}/process/searchmedicinebasket`);
  //   res.subscribe({
  //     next: (response) => {
  //       // console.log(response);
  //       if (response.status == 200) {

  //       } else {
  //       }
  //     },
  //     error: (err) => {
  //       console.error('getDrugsbound Failed:', err);
  //     },
  //   });
  //   return res;
  // }


  getSearchMedicineBasket(resultData: any): Observable<DeviceResponse> {
        return this.http.post<DeviceResponse>(`${this.apiUrl}/process/searchmedicinebasket`, resultData).pipe(
          shareReplay(1),
          tap((response: { status: number; }) => {
            if (response.status === 200) {
              console.log('Success:', response);
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

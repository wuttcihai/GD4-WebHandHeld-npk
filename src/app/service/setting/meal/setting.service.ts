import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

interface DeviceResponse {
  status: number;
  data?: any;
}
@Injectable({
  providedIn: 'root',
})
export class MealService {
  // private apiUrl = 'http://127.0.0.1:6427/setting/devicedrugmanage/device/all';
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getMeal(resultData: any): Observable<DeviceResponse> {
    return this.http.post<DeviceResponse>(`${this.apiUrl}/master/mstime/all`, resultData).pipe(
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

  updateMeal(resultData: any): Observable<DeviceResponse> {
    return this.http.post<DeviceResponse>(`${this.apiUrl}/master/mstime/update`, resultData).pipe(
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

  deleteMeal(resultData: any): Observable<DeviceResponse> {
    return this.http.delete<DeviceResponse>(`${this.apiUrl}/master/mstime/delete`, {
      body: resultData, // Correct way to send data in DELETE requests
    }).pipe(
      tap((response: DeviceResponse) => {
        if (response.status === 200) {
          // this.toastr.success('Successful!', 'แจ้งเตือน');
        }
      }),
      catchError(error => {
        // this.toastr.warning(error, 'แจ้งเตือน', {
        //   toastClass: 'custom-toast-warning',
        // });
        return throwError(() => error);
      })
    );
  }

  deleteTimedetail(resultData: any): Observable<DeviceResponse> {
    return this.http.delete<DeviceResponse>(`${this.apiUrl}/master/mstimedetail/delete`, {
      body: resultData, // Correct way to send data in DELETE requests
    }).pipe(
      tap((response: DeviceResponse) => {
        if (response.status === 200) {
          // this.toastr.success('Successful!', 'แจ้งเตือน');
        }
      }),
      catchError(error => {
        // this.toastr.warning(error, 'แจ้งเตือน', {
        //   toastClass: 'custom-toast-warning',
        // });
        return throwError(() => error);
      })
    );
  }
  
  // deleteMeal(resultData: any): Observable<DeviceResponse> {
  //   return this.http.delete<DeviceResponse>(`${this.apiUrl}/master/mstime/delete`, resultData).pipe(
  //     tap((response: { status: number; }) => {
  //       if (response.status === 200) {
  //         // this.toastr.success('Successful!', 'แจ้งเตือน');
  //       }
  //     }),
  //     catchError(error => {
  //       // this.toastr.warning(error, 'แจ้งเตือน', {
  //       //   toastClass: 'custom-toast-warning',
  //       // });
  //       return throwError(error);
  //     })
  //   );
  // }


  getMs_Drug(): Observable<any> {
    // console.log(`${this.apiUrl}/setting/devicedrugmanage/msdugs/all`)
    const res = this.http.get<DeviceResponse>(`${this.apiUrl}/setting/devicedrugmanage/msdugs/all`);
    res.subscribe({
      next: (response) => {
        // console.log(response);
        if (response.status == 200) {

        } else {
        }
      },
      error: (err) => {
        console.error('getDrugsbound Failed:', err);
      },
    });
    return res;
  }

  updatePaymentFormat(resultData: any): Observable<DeviceResponse> {
    return this.http.post<DeviceResponse>(`${this.apiUrl}/setting/paymentformat/update`, resultData).pipe(
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


  deleteDrugs(resultData: any): Observable<DeviceResponse> {
    return this.http.delete<DeviceResponse>(`${this.apiUrl}/setting/devicedrugmanage/drugs/delete`, {
      body: resultData, // Correct way to send data in DELETE requests
    }).pipe(
      tap((response: DeviceResponse) => {
        if (response.status === 200) {
          // this.toastr.success('Successful!', 'แจ้งเตือน');
        }
      }),
      catchError(error => {
        // this.toastr.warning(error, 'แจ้งเตือน', {
        //   toastClass: 'custom-toast-warning',
        // });
        return throwError(() => error);
      })
    );
  }
  
  
}

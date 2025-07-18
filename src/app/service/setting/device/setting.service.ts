import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

interface DeviceResponse {
  status: number;
  data?: any;
}
@Injectable({
  providedIn: 'root',
})
export class SettingService {
  // private apiUrl = 'http://127.0.0.1:6427/setting/devicedrugmanage/device/all';
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;

  constructor(private http: HttpClient, private toastr: ToastrService) { }


  settingDevice(): Observable<DeviceResponse> {
    return this.http.get<DeviceResponse>(`${this.apiUrl}/setting/devicedrugmanage/device/all`).pipe(
      shareReplay(1),
      tap((response: { status: number; }) => {
        if (response.status === 200) {
          // console.log('Success:', response);
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

  getDrugsbound(): Observable<DeviceResponse> {
    return this.http.get<DeviceResponse>(`${this.apiUrl}/setting/devicedrugmanage/drugs/all`).pipe(
      shareReplay(1),
      tap((response: { status: number; }) => {
        if (response.status === 200) {
          // console.log('Success:', response);
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



  getMs_Drug(): Observable<DeviceResponse> {
    return this.http.get<DeviceResponse>(`${this.apiUrl}/setting/devicedrugmanage/msdugs/all`).pipe(
      shareReplay(1),
      tap((response: { status: number; }) => {
        if (response.status === 200) {
          // console.log('Success:', response);
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

  updateMs_Drug(resultData: any): Observable<DeviceResponse> {
    return this.http.post<DeviceResponse>(`${this.apiUrl}/setting/devicedrugmanage/msdugs/update`, resultData).pipe(
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

  updateDevice(resultData: any): Observable<DeviceResponse> {
    return this.http.post<DeviceResponse>(`${this.apiUrl}/setting/devicedrugmanage/device/update`, resultData).pipe(
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

  syncProducts(resultData: any): Observable<DeviceResponse> {
    return this.http.post<DeviceResponse>(`${this.apiUrl}/dih/syncproducts`, resultData).pipe(
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

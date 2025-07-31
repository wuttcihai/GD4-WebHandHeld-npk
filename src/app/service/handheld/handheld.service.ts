import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class HandheldService {
  // private apiUrl = 'http://127.0.0.1:6427/setting/devicedrugmanage/device/all';
  // apiUrl = 'http://127.0.0.1:6425';
  apiUrl = environment.apiURLipd;
  // private apiUrluserpatient = '/emarapi/admit/patient';

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
  postprescription(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(` ${this.apiUrl}/emar/package`, resultData)
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            // console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }






  postshelf(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(`${this.apiUrl}/emar/ipd_admit`, resultData)
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            // console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }
  postpatientadmit(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(`${this.apiUrl}/emar/ipd_admit`, resultData)
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            // console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }

  postpatientadmitpackage(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(`${this.apiUrl}/emar/package`, resultData)
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            // console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }
  postupdatemederror(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(`${this.apiUrl}/general/mederror/update`, resultData)
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
          }
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }


  postmeddicationerrorheader(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(`${this.apiUrl}/emar/medicationerrordetail`, resultData)
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            // console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }


  updatepackage(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(`${this.apiUrl}/emar/updatepackage`, resultData)
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }

  updatprepare(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(`${this.apiUrl}/emar/insertpackage`, resultData)
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            // console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }

  getDispense(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(
        `${this.apiUrl}/emar/ipd_admit/dispense`,
        resultData
      )
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            // console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }

  loginEmar(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(`${this.apiUrl}/emar/login`, resultData)
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            // console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }

  postMedError(resultData: any): Observable<DeviceResponse> {
    return this.http
      .post<DeviceResponse>(
        `${this.apiUrl}/general//mederror/update`,
        resultData
      )
      .pipe(
        shareReplay(1),
        tap((response: { status: number }) => {
          if (response.status === 200) {
            // console.log('Success:', response);
            // this.toastr.success('Successful!', 'แจ้งเตือน');
          }
        }),
        catchError((error) => {
          // this.toastr.warning(error, 'แจ้งเตือน', {
          //   toastClass: 'custom-toast-warning',
          // });
          return throwError(error);
        })
      );
  }

  // get
  getWard(resultData: any): Observable<DeviceResponse> {
    return this.http.post<any>(`${this.apiUrl}/emar/ward/all`, resultData);
  }
}

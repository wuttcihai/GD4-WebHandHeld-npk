import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SettingService } from '../../service/setting/users/setting.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-popupstepper',
  standalone: false,
  templateUrl: './popupstepper.component.html',
  styleUrl: './popupstepper.component.scss'
})
export class PopupstepperComponent implements OnInit {
  resData: any;
  groupedSidebarData: { [key: string]: any[] } = {};
  inputdata: any;
  authorizedIds: Set<number> = new Set(); // Set เก็บ authorized sidebar_id
  checked = false;
  disabled = false;
  checkedItems: Set<number> = new Set(); // เก็บ checkbox ที่เลือก
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private settingService: SettingService,
    private ref: MatDialogRef<PopupstepperComponent>,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private http: HttpClient,
  ) {
    this.settingService.getSidebar().subscribe({
      next: (response) => {
        if (response.status === 200) {
       
           const filteredData = response.data.filter((item: { pharmacycode: string; isEnabled: string; }) => item.pharmacycode === localStorage.getItem("pharmacycode") && item.isEnabled === "Y");

          //  console.log("Filtered Data:", filteredData);
          this.resData =filteredData;
          this.groupedSidebarData = this.groupBy(this.resData, 'sidebar_group');
          this.setAuthorizedIds(); // ตรวจสอบ authorized
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Fetch Sidebar Failed:', err);
      },
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.inputdata = this.data;
      this.setAuthorizedIds();
      this.cdr.detectChanges();
      this.checkedItems = new Set(this.authorizedIds); // ตั้งค่าเริ่มต้นของ Checkbox
    }, 500);

  }

  groupBy(array: any[], key: string) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  }

  setAuthorizedIds() {
    if (this.inputdata?.dataRow?.authorized) {
      this.authorizedIds = new Set(
        this.inputdata.dataRow.authorized.map((auth: any) => auth.sidebar_id)
      );
    }
  }

  isChecked(sidebar_id: number): boolean {
    // console.log('Checked items:', this.checkedItems);
    // console.log('Checking for:', sidebar_id, 'Result:', this.checkedItems.has(sidebar_id));
    return this.checkedItems.has(sidebar_id);
  }

  // toggleCheck(sidebar_id: number, event: any) {
  //   console.log('Toggling:',event.target.checked);
  //   if (event.target.checked) {
  //     this.checkedItems.add(sidebar_id);
  //   } else {
  //     this.checkedItems.delete(sidebar_id);
  //   }
  // }

  toggleCheck(sidebar_id: number, event: MatSlideToggleChange) {
    console.log('Toggling:', event.checked);
    if (event.checked) {
      this.checkedItems.add(sidebar_id);
    } else {
      this.checkedItems.delete(sidebar_id);
    }
  }

  saveAuthorized() {
    let updatedData = {}
console.log(Array.from(this.checkedItems))
    if (this.inputdata.comeFrom) {
      updatedData = {
        _id: this.inputdata.dataRow._id,
        groupname: this.inputdata.dataRow.groupname,
        suspended: this.inputdata.dataRow.suspended,
        authorized: Array.from(this.checkedItems), // แปลง Set เป็น Array
        createddate: this.inputdata.dataRow.createddate
      };
    } else {
      updatedData = { 
      _id: this.inputdata.dataRow._id,
      userID: this.inputdata.dataRow.userID,
      fullname: this.inputdata.dataRow.fullname,
      positioncode: this.inputdata.dataRow.positioncode,
      userbarcode: this.inputdata.dataRow.userbarcode,
      username: this.inputdata.dataRow.username,
      password: this.inputdata.dataRow.password,
      photo: this.inputdata.dataRow.photo,
      firstname: this.inputdata.dataRow.firstname,
      lastname: this.inputdata.dataRow.lastname,
      departmentcode: this.inputdata.dataRow.departmentcode,
      type: this.inputdata.dataRow.type,
      suspended: this.inputdata.dataRow.suspended,
      createDT: this.inputdata.dataRow.createDT,
      titlename: this.inputdata.dataRow.titlename,
      delete: this.inputdata.dataRow.delete,
      authorized: Array.from(this.checkedItems), 
      }

    }


    console.log('Updated Data:', updatedData);

    this.http.post(this.data.apiUrl, updatedData).subscribe({
      next: response => {
        this.toastr.success('Successful!', 'แจ้งเตือน');
        this.ref.close(updatedData);
      },
      error: error => {
        this.toastr.warning(error, 'แจ้งเตือน', {
          toastClass: 'custom-toast-warning',
        });
      }
    });
  }

  closepopup() {
    // console.log('Close')
    this.ref.close('Close');
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HandheldService } from '../../service/handheld/handheld.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private apiService: HandheldService) { }
  // ================= decare ======================================
  id: any = "";
  hn: any = "";
  an: any = "";
  patientname: any = "";
  activewardcode: any = "";
  activebed: any = "";
  picture: any = "";
  //ReciveDatetime: any = "";
  takedate: any = "";
  total: number = 0;
  wait: number = 0;
  Recevie: number = 0;
  Had: number = 0;
  mul: number = 0;
  d0: number = 0;
  d1: number = 0;
  d2: number = 0;
  d3: number = 0;
  d4: number = 0;
  d5: number = 0;
  d6: number = 0;
  d7: number = 0;
  d8: number = 0;
  d9: number = 0;
  d10: number = 0;
  d11: number = 0;
  d12: number = 0;
  d13: number = 0;
  d14: number = 0;
  d15: number = 0;
  d16: number = 0;
  d17: number = 0;
  d18: number = 0;
  d19: number = 0;
  d20: number = 0;
  d21: number = 0;
  d22: number = 0;
  d23: number = 0;
  d24: number = 0;
  prse1: any[] = [];
  prse2: any[] = [];
  prse3: any[] = [];
  mergedArray: any[] = [];
  keeppres: String = "";

  wardcode: any;
  wardname: any;
  inputData: any = "";
  patientadmit: any;
  patientadmits: any;
  prescription: any;
  prescriptionall: any;
  prescriptionrecivenull: any;
  prescriptionrecivenotnull: any;
  prescriptions: any;
  resDataPatientadmit2: any;

  hours = Array.from({ length: 25 }, (_, i) => i); // Generate 24-hour slots
  currentHour: number = new Date().getHours(); // Get current hour

  // ================= decare ======================================
  ngOnInit() {
    const ward = localStorage.getItem('WARD');
    if (ward === null) {
      window.location.href = '/ward';
    }
    this.loadData();
  }
  loadData(): void {
    this.wardcode = localStorage.getItem('WARD');
    const ward = JSON.parse(this.wardcode);
    this.inputData = { "wardcode": `${ward.wardcode}` };

    this.apiService.postpatientadmit(this.inputData).subscribe(pattient => {
      this.patientadmits = pattient;
      console.log(this.patientadmits);

      //let prescriptionno = `{"an":"${this.patientadmit.an}","hn":"${this.patientadmit.hn}"}`;
      this.apiService.postprescription(this.inputData).subscribe((response: any) => {
        this.prescriptionall = response;
        this.aftergetprescription(this.patientadmits);
      });

      //this.formattedTime = this.now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      //this.formattedTime = this.now.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false });
      //console.log(this.formattedTime);  
      //console.log(this.hours);   
      //console.log(this.id);
      // สร้าง array ใหม่

      this.prse2 = this.patientadmits.data;



      //console.log(this.mergedArray);

      //console.log(this.keeppres);       

    });

  }
  aftergetprescription(patientadmits: any): void {
    //  console.log('patinet loaded:', patientadmits);      
    //   console.log('Users loaded:', this.prescriptionrecivenull); // ✅ Still runs after data is fetched

    this.prse2 = this.patientadmits.data;
    //console.log(this.patientadmits.data)
    for (this.patientadmit of this.patientadmits.data) {
      let pres: any;
      let prescriptionno = `{"an":"${this.patientadmit.an}","hn":"${this.patientadmit.hn}"}`;
      this.prescriptionrecivenull = this.prescriptionall.data.filter((r: any) => r.an === this.patientadmit.an && r.hn === this.patientadmit.hn)


      if (this.prescriptionrecivenull.length > 0) {
        for (this.prescription of this.prescriptionrecivenull) {
          this.an = "";
          this.an = `${this.prescription.an}`
          //console.log(this.prescription);
          let ReciveDatetime = this.prescription.recivedatetime;
          if (this.an !== null) {
            if (ReciveDatetime != null) {
              this.Recevie = this.Recevie + 1;
            } else {
              this.wait = this.wait + 1;
            }
          }

        }
      } else {
        this.an = "";
        // this.an = `${this.patientadmit.an}`;
        this.wait = 0;
        this.Recevie = 0;
      }


      this.prse3.push({
        an: this.an,
        Wait: `${this.wait}`,
        Recevie: `${this.Recevie}`
      });

      //  console.log(this.prse3)


      this.id = `${this.patientadmit._id}`;
      this.hn = `${this.patientadmit.hn}`;
      if (`${this.patientadmit.an}` != "") {
        this.an = `${this.patientadmit.an}`;
      } else {
        this.an = "";
      }


      this.patientname = `${this.patientadmit.patientname}`;
      this.activewardcode = `${this.patientadmit.activewardcode}`;
      this.activebed = `${this.patientadmit.activebed}`;
      this.picture = `${this.patientadmit.picture}`;



      if (`${this.patientadmit.an}` !== "") {
        let prescriptionno = `{"an":"${this.patientadmit.an}","hn":"${this.patientadmit.hn}"}`;
        this.prescriptions = this.prescriptionrecivenull;

        this.total = 0;

        this.Had = 0;
        this.mul = 0;
        this.d0 = 0;
        this.d1 = 0;
        this.d2 = 0;
        this.d3 = 0;
        this.d4 = 0;
        this.d5 = 0;
        this.d6 = 0;
        this.d7 = 0;
        this.d8 = 0;
        this.d9 = 0;
        this.d10 = 0;
        this.d11 = 0;
        this.d12 = 0;
        this.d13 = 0;
        this.d14 = 0;
        this.d15 = 0;
        this.d16 = 0;
        this.d17 = 0;
        this.d18 = 0;
        this.d19 = 0;
        this.d20 = 0;
        this.d21 = 0;
        this.d22 = 0;
        this.d23 = 0;
        this.d24 = 0;
        //console.log(this.prescriptions.data);
        this.wait = 0;
        this.Recevie = 0;

        if (this.prescriptions !== null) {

          for (this.prescription of this.prescriptions) {

            //this.an = `${this.prescription.an}`;
            let ReciveDatetime = this.prescription.recivedatetime;

            var frequencyTime: string = `"${this.prescription.frequencytime}"`

            if (`"${this.prescription.highalert}"` == "1") {
              this.Had = this.Had + 1;
            }
            if (`"${this.prescription.ordertype}"` == "1" || `"${this.prescription.ordertype}"` == "7") {
              this.mul = this.mul + 1;
            }
            if (`"${this.prescription.highalert}"` == "1") {
              this.Had = this.Had + 1;
            }
            if (`"${this.prescription.ordertype}"` == "1" || `"${this.prescription.ordertype}"` == "7") {
              this.mul = this.mul + 1;
            }
            if (frequencyTime.indexOf("0000") > 0 && (ReciveDatetime !== null)) {
              this.d0 = this.d0 + 1;
            }
            if (frequencyTime.indexOf("0100") > 0 && (ReciveDatetime !== null)) {
              this.d1 = this.d1 + 1;
            }
            if (frequencyTime.indexOf("0200") > 0 && (ReciveDatetime !== null)) {
              this.d2 = this.d2 + 1;
            }
            if (frequencyTime.indexOf("0300") > 0 && (ReciveDatetime !== null)) {
              this.d3 = this.d3 + 1;
            }
            if (frequencyTime.indexOf("0400") > 0 && (ReciveDatetime !== null)) {
              this.d4 = this.d4 + 1;
            }
            if (frequencyTime.indexOf("0500") > 0 && (ReciveDatetime !== null)) {
              this.d5 = this.d5 + 1;
            }
            if (frequencyTime.indexOf("0600") > 0 && (ReciveDatetime !== null)) {
              this.d6 = this.d6 + 1;
            }
            if (frequencyTime.indexOf("0700") > 0 && (ReciveDatetime !== null)) {
              this.d7 = this.d7 + 1;
            }
            if (frequencyTime.indexOf("0800") > 0 && (ReciveDatetime !== null)) {
              this.d8 = this.d8 + 1;
            }
            if (frequencyTime.indexOf("0900") > 0 && (ReciveDatetime !== null)) {
              this.d9 = this.d9 + 1;
            }
            if (frequencyTime.indexOf("1000") > 0 && (ReciveDatetime !== null)) {
              this.d10 = this.d10 + 1;
            }
            if (frequencyTime.indexOf("1100") > 0 && (ReciveDatetime !== null)) {
              this.d11 = this.d11 + 1;
            }
            if (frequencyTime.indexOf("1200") > 0 && (ReciveDatetime !== null)) {
              this.d12 = this.d12 + 1;
            }
            if (frequencyTime.indexOf("1300") > 0 && (ReciveDatetime !== null)) {
              this.d13 = this.d13 + 1;
            }
            if (frequencyTime.indexOf("1400") > 0 && (ReciveDatetime !== null)) {
              this.d14 = this.d14 + 1;
            }
            if (frequencyTime.indexOf("1500") > 0 && (ReciveDatetime !== null)) {
              this.d15 = this.d15 + 1;
            }
            if (frequencyTime.indexOf("1600") > 0 && (ReciveDatetime !== null)) {
              this.d16 = this.d16 + 1;
            }
            if (frequencyTime.indexOf("1700") > 0 && (ReciveDatetime !== null)) {
              this.d17 = this.d17 + 1;
            }
            if (frequencyTime.indexOf("1800") > 0 && (ReciveDatetime !== null)) {
              this.d18 = this.d18 + 1;
            }
            if (frequencyTime.indexOf("1900") > 0 && (ReciveDatetime !== null)) {
              this.d19 = this.d19 + 1;
            }
            if (frequencyTime.indexOf("2000") > 0 && (ReciveDatetime !== null)) {
              this.d20 = this.d20 + 1;
            }
            if (frequencyTime.indexOf("2100") > 0 && (ReciveDatetime !== null)) {
              this.d21 = this.d21 + 1;
            }
            if (frequencyTime.indexOf("2200") > 0 && (ReciveDatetime !== null)) {
              this.d22 = this.d22 + 1;
            }
            if (frequencyTime.indexOf("2300") > 0 && (ReciveDatetime !== null)) {
              this.d23 = this.d23 + 1;
            }
            if (frequencyTime.indexOf("2400") > 0 && (ReciveDatetime !== null)) {
              this.d24 = this.d24 + 1;
            }

          }
          //console.log(`${this.prescription.an}`);
          // console.log(this.an + "ddddd" );
          if (this.an !== "") {
            this.prse1.push({
              an: this.an,
              takedate: `${this.prescription.takedate}`,
              multidose: this.mul,
              had: this.Had,
              hours: [{ timed: 0, quantity: this.d0 },
              { timed: 1, quantity: this.d1 },
              { timed: 2, quantity: this.d2 },
              { timed: 3, quantity: this.d3 },
              { timed: 4, quantity: this.d4 },
              { timed: 5, quantity: this.d5 },
              { timed: 6, quantity: this.d6 },
              { timed: 7, quantity: this.d7 },
              { timed: 8, quantity: this.d8 },
              { timed: 9, quantity: this.d9 },
              { timed: 10, quantity: this.d10 },
              { timed: 11, quantity: this.d11 },
              { timed: 12, quantity: this.d12 },
              { timed: 13, quantity: this.d13 },
              { timed: 14, quantity: this.d14 },
              { timed: 15, quantity: this.d15 },
              { timed: 16, quantity: this.d16 },
              { timed: 17, quantity: this.d17 },
              { timed: 18, quantity: this.d18 },
              { timed: 19, quantity: this.d19 },
              { timed: 20, quantity: this.d20 },
              { timed: 21, quantity: this.d21 },
              { timed: 22, quantity: this.d22 },
              { timed: 23, quantity: this.d23 },
              { timed: 24, quantity: this.d24 }]
            });
          }

        } // ปิด prescription.data ไม่เท่ากับค่าว่าง


        //});
      }
      //console.log(this.prse1);
      this.mergedArray = this.prse2.map(obj1 => ({
        ...obj1,
        ...this.prse1.find(obj2 => obj2.an === obj1.an),
        ...this.prse3.find(obj3 => obj3.an === obj1.an)
      }));
      this.mergedArray = this.mergedArray.sort((a: any, b: any) => a.activebed - b.activebed)


    }


  }
  getUpcomingMedicationCount(): number {
    if (!this.prse1 || !this.mergedArray) return 0;

    const nextHour = this.currentHour + 1 > 23 ? 0 : this.currentHour + 1;
    let patientCount = 0;

    this.mergedArray.forEach(patient => {
      const patientData = this.prse1.find(p => p.an === patient.an);
      if (patientData) {
        const hourData = patientData.hours.find((h: { timed: number; }) => h.timed === nextHour);
        if (hourData && hourData.quantity > 0) {
          patientCount++;
        }
      }
    });

    return patientCount;
  }
  getPatientsWithUpcomingMedsUntilMidnight(): number {
    if (!this.prse1 || !this.mergedArray) return 0;

    const currentHour = this.currentHour;
    let patientCount = 0;
    const uniquePatients = new Set();

    for (let hour = currentHour + 1; hour <= 23; hour++) {
      this.mergedArray.forEach(patient => {
        const patientData = this.prse1.find(p => p.an === patient.an);
        if (patientData) {
          const hourData = patientData.hours.find((h: { timed: number }) => h.timed === hour);
          if (hourData && hourData.quantity > 0) {
            uniquePatients.add(patient.an);
          }
        }
      });
    }

    return uniquePatients.size;
  }
  getTotalCompleted(): number {
    return this.prse3.reduce((total, item) => total + (+item.Recevie || 0), 0);
  }

}

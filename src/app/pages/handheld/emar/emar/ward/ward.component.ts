import { Component, OnInit } from '@angular/core';
import { HandheldService } from '../../service/handheld/handheld.service';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.scss'],
  standalone: false,
})
export class WardComponent implements OnInit {
  constructor(private _hh: HandheldService) {}

  WARD: any = [];
  _WARD: any = [];

  FIND: any = '';

  ngOnInit() {
    this.loadWard();
  }
  async loadWard() {
    const q = {
      wardstatus: 'Y',
    };
    let ww = await this._hh.getWard(q).toPromise();
    // console.log(this.WARD);

    this.WARD = [];
    // wardcode: '0112';
    // warddescEN: 'ODS/MIS';
    // warddescTH: 'หอผู้ป่วยสังเกตอาการ ODS/MIS';
    if (ww) {
      for (let w of ww.data) {
        const ward = {
          wardcode: w.wardcode,
          warddescEN: w.warddescEN,
          warddescTH: w.warddescTH,
        };
        this._WARD.push(ward);
      }
      this.WARD = this._WARD;
      // console.log(this.WARD);
    }
  }
  filterWardByText(text: string) {
    if (!text) {
      this.WARD = this._WARD;
      return;
    }
    const lowerText = text.toLowerCase();
    this.WARD = this._WARD.filter(
      (ward: any) =>
        ward.wardcode.toLowerCase().includes(lowerText) ||
        ward.warddescEN.toLowerCase().includes(lowerText) ||
        ward.warddescTH.toLowerCase().includes(lowerText)
    );
  }

  bnSelect(w: any) {
    localStorage.setItem('WARD', JSON.stringify(w));
    window.location.href = '/home';
  }
}

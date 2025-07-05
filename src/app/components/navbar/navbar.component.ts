import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  fontStyleControl = new FormControl('');
  fontStyle?: string;
  selectedValue = localStorage.getItem('pharmacycode');

  WARD: any = JSON.parse(localStorage.getItem('WARD') || '{}');

  opdClick() {
    localStorage.setItem('pharmacycode', 'OPD');
    window.location.href = '/';
  }

  ipdClick() {
    localStorage.setItem('pharmacycode', 'IPD');
    window.location.href = '/';
  }
  toggleLocalStorage() {
    // let clickedMenu = localStorage.getItem('clickedMenu');

    // if (clickedMenu === null || clickedMenu === 'true') {
    //   localStorage.setItem('clickedMenu', 'false');
    //   console.log('clickedMenu set to false');
    // }
    // else if (clickedMenu === 'false') {
    localStorage.setItem('clickedMenu', 'true');
    // console.log('clickedMenu set to true');
    // }
  }
}

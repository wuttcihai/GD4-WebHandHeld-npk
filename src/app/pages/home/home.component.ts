import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  ngOnInit() {
    const ward = localStorage.getItem('WARD');
    if (ward === null) {
      window.location.href = '/ward';
    }
  }
}

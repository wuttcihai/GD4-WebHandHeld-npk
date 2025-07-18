import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: false


})
export class MainComponent {
  constructor(private location: Location) { }
  goBack() {
    // let clickedMenu = localStorage.getItem('clickedMenu');

      localStorage.setItem('clickedMenu', 'false');
    this.location.back(); 
  }
}

import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: false,
})
export class FooterComponent {
  @Input() activeTab: string = 'home';

  tabs = [
    {
      id: 'Home',
      icon: 'home ',
      label: 'Home',
      routerLink: '/home',
    },
    {
      id: 'Recive',
      icon: 'assignment_returned ',
      label: 'Recive',
      routerLink: '/recive',
    },
    {
      id: 'Prepare',
      icon: 'assignment ',
      label: 'Prepare',
      routerLink: '/prepare',
    },
    {
      id: 'Dispense',
      icon: 'shopping_cart ',
      label: 'Dispense',
      routerLink: '/dispense',
    },
  ];

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
    // You can add navigation logic here if using Angular Router
  }
}

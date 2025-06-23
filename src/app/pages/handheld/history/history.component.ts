import { Component, HostListener, ElementRef, Renderer2} from '@angular/core';


@Component({
  selector: 'app-history',
  standalone: false,
  
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent  {
  constructor() {
    // Hide the accessory bar if Keyboard plugin is available
    // if (typeof (window as any).Keyboard !== 'undefined' && (window as any).Keyboard.setAccessoryBarVisible) {
    //   (window as any).Keyboard.setAccessoryBarVisible({ isVisible: false });
    // }
  }

  preventKeyboard(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFocus(event: FocusEvent) {
    // ทันทีที่โฟกัส ให้ blur เพื่อไม่ให้คีย์บอร์ดขึ้น
    (event.target as HTMLInputElement).blur();
  }
}
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scanbarcode',
  standalone: false,

  templateUrl: './scanbarcode.component.html',
  styleUrl: './scanbarcode.component.scss'
})
export class ScanbarcodeComponent {
  barcodeBuffer = '';
  lastScannedBarcode = '';

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      // console.log('Scanned Barcode:', this.barcodeBuffer);
      this.lastScannedBarcode = this.barcodeBuffer;
      this.barcodeBuffer = ''; // reset
    } else {
      this.barcodeBuffer += event.key;
    }
  }

}

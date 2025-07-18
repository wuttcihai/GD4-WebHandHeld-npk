import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scanbarcode',
  standalone: false,

  templateUrl: './scanbarcode.component.html',
  styleUrl: './scanbarcode.component.scss'
})
export class ScanbarcodeComponent {
  barcodeBuffer: string = '';
  scanTimeout: any;
  @ViewChild('scannerInput') scannerInput!: ElementRef;

  scannedBarcodes: string[] = [];

  onBarcodeScanned(barcode: string) {
    if (barcode.trim()) {
      console.log('Scanned:', barcode);
      this.scannedBarcodes.push(barcode);
    }
  }

  ngAfterViewInit() {
    this.scannerInput.nativeElement.focus();
  }

  onBarcodeInput(event: any) {
    const barcode = event.target.value;
    console.log('Scanned barcode:', barcode);
    this.onBarcodeScanned(barcode);
    event.target.value = ''; // clear input
  }
}

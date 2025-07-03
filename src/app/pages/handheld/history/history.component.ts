import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: false,
  template: `
    <div class="scanner-container">
      <h2>Barcode Scanner</h2>
      <div class="barcode-display">
        <p class="barcode-label">Scanned Barcode:</p>
        <p class="barcode-value" [class.new-scan]="isNewScan">{{ scannedBarcode || 'กรุณาสแกนบาร์โค้ด...' }}</p>
      </div>
      
      <div class="scan-history" *ngIf="scanHistory.length > 0">
        <h3>ประวัติการสแกน:</h3>
        <div class="history-item" *ngFor="let item of scanHistory; let i = index">
          <span class="history-number">{{ i + 1 }}.</span>
          <span class="history-code">{{ item.code }}</span>
          <span class="history-time">{{ item.timestamp | date:'dd/MM/yyyy HH:mm:ss' }}</span>
        </div>
      </div>
      
      <button class="clear-btn" (click)="clearHistory()" *ngIf="scanHistory.length > 0">
        ล้างประวัติ
      </button>
    </div>
    
    <!-- Hidden input for capturing scan data -->
    <input 
      #hiddenInput
      type="text" 
      style="position: absolute; left: -9999px; opacity: 0;"
      (keydown)="onKeyDown($event)"
      (input)="onInput($event)"
    />
  `,
  styles: [`
    /* ... (keep existing styles unchanged) ... */
  `]
})
export class HistoryComponent implements OnInit, OnDestroy {
  @ViewChild('hiddenInput') hiddenInput!: ElementRef<HTMLInputElement>;
  
  scannedBarcode: string = '';
  scanHistory: Array<{code: string, timestamp: Date}> = [];
  isNewScan: boolean = false;
  private scanBuffer: string = '';
  private scanTimeout: any;
  private readonly SCAN_TIMEOUT = 50; // milliseconds (shorter timeout for faster scanners)
  private isDeviceKeyboardEnabled = false;

  ngOnInit() {
    // Detect if this is running on iData device
    this.detectIDataDevice();
    
    // Set up listeners
    this.setupScanListeners();
  }

  ngOnDestroy() {
    this.cleanupListeners();
  }

  private detectIDataDevice() {
    // Try to detect iData device by user agent or other characteristics
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('idata') || userAgent.includes('android')) {
      this.isDeviceKeyboardEnabled = false;
      console.log('Running on iData or similar mobile device - disabling virtual keyboard');
    } else {
      this.isDeviceKeyboardEnabled = true;
      console.log('Running on standard device - virtual keyboard may be enabled');
    }
  }

  private setupScanListeners() {
    // Focus on the hidden input to capture scan data
    this.focusHiddenInput();
    
    // Set up global key listener for scanner
    document.addEventListener('keydown', this.handleGlobalKeyDown.bind(this));
    
    // Prevent virtual keyboard on mobile devices
    this.preventVirtualKeyboard();
    
    // Handle focus events
    if (this.hiddenInput?.nativeElement) {
      this.hiddenInput.nativeElement.addEventListener('focus', this.handleInputFocus.bind(this));
      this.hiddenInput.nativeElement.addEventListener('blur', this.handleInputBlur.bind(this));
    }
  }

  private cleanupListeners() {
    document.removeEventListener('keydown', this.handleGlobalKeyDown.bind(this));
    if (this.hiddenInput?.nativeElement) {
      this.hiddenInput.nativeElement.removeEventListener('focus', this.handleInputFocus.bind(this));
      this.hiddenInput.nativeElement.removeEventListener('blur', this.handleInputBlur.bind(this));
    }
    if (this.scanTimeout) {
      clearTimeout(this.scanTimeout);
    }
  }

  private focusHiddenInput() {
    setTimeout(() => {
      if (this.hiddenInput?.nativeElement) {
        this.hiddenInput.nativeElement.focus();
      }
    }, 100);
  }

  private handleInputFocus() {
    if (!this.isDeviceKeyboardEnabled && this.hiddenInput?.nativeElement) {
      // For iData devices, keep the input readonly to prevent keyboard
      this.hiddenInput.nativeElement.setAttribute('readonly', 'true');
    }
  }

  private handleInputBlur() {
    // Refocus immediately if we lose focus
    this.focusHiddenInput();
  }

  private preventVirtualKeyboard() {
    if (!this.hiddenInput?.nativeElement) return;
    
    // More aggressive prevention for mobile devices
    const input = this.hiddenInput.nativeElement;
    
    input.setAttribute('readonly', 'true');
    input.setAttribute('inputmode', 'none');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
    
    // Additional Android-specific prevention
    input.style.setProperty('opacity', '0', 'important');
    input.style.setProperty('width', '0', 'important');
    input.style.setProperty('height', '0', 'important');
    input.style.setProperty('padding', '0', 'important');
    input.style.setProperty('margin', '0', 'important');
    input.style.setProperty('border', 'none', 'important');
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event) {
    // Keep focus on hidden input
    this.focusHiddenInput();
  }

  private handleGlobalKeyDown(event: KeyboardEvent) {
    // Special handling for iData scanner
    if (!this.isDeviceKeyboardEnabled) {
      // iData scanners typically send characters rapidly followed by Enter
      if (event.key === 'Enter') {
        if (this.scanBuffer.trim()) {
          this.processScan(this.scanBuffer.trim());
          this.scanBuffer = '';
        }
        event.preventDefault();
        return;
      }
      
      // Ignore modifier keys and non-character keys
      if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
        this.scanBuffer += event.key;
        
        // Clear previous timeout
        if (this.scanTimeout) {
          clearTimeout(this.scanTimeout);
        }
        
        // Set shorter timeout for barcode scanners
        this.scanTimeout = setTimeout(() => {
          if (this.scanBuffer.trim()) {
            this.processScan(this.scanBuffer.trim());
            this.scanBuffer = '';
          }
        }, this.SCAN_TIMEOUT);
        
        event.preventDefault();
      }
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      if (input.value.trim()) {
        this.processScan(input.value.trim());
        input.value = '';
      }
      event.preventDefault();
    }
  }

  onInput(event: Event) {
    if (!this.isDeviceKeyboardEnabled) return;
    
    const input = event.target as HTMLInputElement;
    
    // Auto-process if input looks complete (common barcode lengths)
    if (input.value.length >= 8) {
      if (this.scanTimeout) {
        clearTimeout(this.scanTimeout);
      }
      
      this.scanTimeout = setTimeout(() => {
        if (input.value.trim()) {
          this.processScan(input.value.trim());
          input.value = '';
        }
      }, this.SCAN_TIMEOUT);
    }
  }

  private processScan(barcode: string) {
    console.log('Barcode scanned:', barcode);
    
    // Update display
    this.scannedBarcode = barcode;
    this.isNewScan = true;
    
    // Add to history
    this.scanHistory.unshift({
      code: barcode,
      timestamp: new Date()
    });
    
    // Keep only last 50 scans
    if (this.scanHistory.length > 50) {
      this.scanHistory = this.scanHistory.slice(0, 50);
    }
    
    // Remove highlight animation after delay
    setTimeout(() => {
      this.isNewScan = false;
    }, 500);
    
    // Keep focus on hidden input
    this.focusHiddenInput();
    
    // Process the barcode
    this.onBarcodeScanned(barcode);
  }
  
  private onBarcodeScanned(barcode: string) {
    // Add your custom logic here
    console.log('Processing barcode:', barcode);
  }
  
  clearHistory() {
    this.scanHistory = [];
    this.scannedBarcode = '';
  }
}
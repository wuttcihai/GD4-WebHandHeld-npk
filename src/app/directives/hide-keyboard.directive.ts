import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appHideKeyboard]'
})
export class HideKeyboardDirective implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit(): void {
        // รอเล็กน้อยแล้ว blur element เพื่อปิด soft keyboard
        setTimeout(() => {
            const input = this.el.nativeElement as HTMLElement;
            if (input && typeof input.blur === 'function') {
                input.blur();
            }
        }, 300);
    }
}
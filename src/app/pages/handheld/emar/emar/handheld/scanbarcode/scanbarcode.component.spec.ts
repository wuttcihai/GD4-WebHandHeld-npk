import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanbarcodeComponent } from './scanbarcode.component';

describe('ScanbarcodeComponent', () => {
  let component: ScanbarcodeComponent;
  let fixture: ComponentFixture<ScanbarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScanbarcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanbarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

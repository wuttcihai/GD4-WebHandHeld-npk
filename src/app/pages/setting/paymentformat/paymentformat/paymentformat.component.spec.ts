import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentformatComponent } from './paymentformat.component';

describe('PaymentformatComponent', () => {
  let component: PaymentformatComponent;
  let fixture: ComponentFixture<PaymentformatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentformatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

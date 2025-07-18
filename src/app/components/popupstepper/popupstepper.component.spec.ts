import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupstepperComponent } from './popupstepper.component';

describe('PopupstepperComponent', () => {
  let component: PopupstepperComponent;
  let fixture: ComponentFixture<PopupstepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupstepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

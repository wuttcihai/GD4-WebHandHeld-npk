import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupuserotherComponent } from './popupuserother.component';

describe('PopupuserotherComponent', () => {
  let component: PopupuserotherComponent;
  let fixture: ComponentFixture<PopupuserotherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupuserotherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupuserotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

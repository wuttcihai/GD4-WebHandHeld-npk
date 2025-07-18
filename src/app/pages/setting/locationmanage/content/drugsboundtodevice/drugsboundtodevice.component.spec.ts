import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsboundtodeviceComponent } from './drugsboundtodevice.component';

describe('DrugsboundtodeviceComponent', () => {
  let component: DrugsboundtodeviceComponent;
  let fixture: ComponentFixture<DrugsboundtodeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrugsboundtodeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugsboundtodeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

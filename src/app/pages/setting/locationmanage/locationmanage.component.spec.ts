import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmanageComponent } from './locationmanage.component';

describe('LocationmanageComponent', () => {
  let component: LocationmanageComponent;
  let fixture: ComponentFixture<LocationmanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationmanageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

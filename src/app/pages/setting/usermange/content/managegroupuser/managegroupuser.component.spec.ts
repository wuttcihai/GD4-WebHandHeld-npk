import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagegroupuserComponent } from './managegroupuser.component';

describe('ManagegroupuserComponent', () => {
  let component: ManagegroupuserComponent;
  let fixture: ComponentFixture<ManagegroupuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagegroupuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagegroupuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

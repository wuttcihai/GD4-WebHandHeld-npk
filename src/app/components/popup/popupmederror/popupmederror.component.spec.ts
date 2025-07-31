import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupmederrorComponent } from './popupmederror.component';

describe('PopupmederrorComponent', () => {
  let component: PopupmederrorComponent;
  let fixture: ComponentFixture<PopupmederrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupmederrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupmederrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

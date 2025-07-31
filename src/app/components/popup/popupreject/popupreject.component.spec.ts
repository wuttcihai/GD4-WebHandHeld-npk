import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuprejectComponent } from './popupreject.component';

describe('PopuprejectComponent', () => {
  let component: PopuprejectComponent;
  let fixture: ComponentFixture<PopuprejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopuprejectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopuprejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

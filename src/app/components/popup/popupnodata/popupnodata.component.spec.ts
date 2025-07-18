import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupnodataComponent } from './popupnodata.component';

describe('PopupnodataComponent', () => {
  let component: PopupnodataComponent;
  let fixture: ComponentFixture<PopupnodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupnodataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupnodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

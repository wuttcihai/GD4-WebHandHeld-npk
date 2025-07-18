import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupselecttimerangeComponent } from './popupselecttimerange.component';

describe('PopupselecttimerangeComponent', () => {
  let component: PopupselecttimerangeComponent;
  let fixture: ComponentFixture<PopupselecttimerangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupselecttimerangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupselecttimerangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

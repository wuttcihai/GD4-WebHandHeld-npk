import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockrobotComponent } from './stockrobot.component';

describe('StockrobotComponent', () => {
  let component: StockrobotComponent;
  let fixture: ComponentFixture<StockrobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockrobotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockrobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

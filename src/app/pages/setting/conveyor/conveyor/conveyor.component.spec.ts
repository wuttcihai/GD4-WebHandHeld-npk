import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveyorComponent } from './conveyor.component';

describe('ConveyorComponent', () => {
  let component: ConveyorComponent;
  let fixture: ComponentFixture<ConveyorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConveyorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveyorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

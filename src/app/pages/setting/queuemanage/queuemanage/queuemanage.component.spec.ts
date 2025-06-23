import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuemanageComponent } from './queuemanage.component';

describe('QueuemanageComponent', () => {
  let component: QueuemanageComponent;
  let fixture: ComponentFixture<QueuemanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QueuemanageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueuemanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

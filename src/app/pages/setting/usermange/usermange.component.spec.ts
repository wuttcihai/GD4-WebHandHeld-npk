import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermangeComponent } from './usermange.component';

describe('UsermangeComponent', () => {
  let component: UsermangeComponent;
  let fixture: ComponentFixture<UsermangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsermangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsermangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

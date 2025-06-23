import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemealComponent } from './managemeal.component';

describe('ManagemealComponent', () => {
  let component: ManagemealComponent;
  let fixture: ComponentFixture<ManagemealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagemealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagemealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

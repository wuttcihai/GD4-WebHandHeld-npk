import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareComponent } from './prepare.component';

describe('PrepareComponent', () => {
  let component: PrepareComponent;
  let fixture: ComponentFixture<PrepareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrepareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

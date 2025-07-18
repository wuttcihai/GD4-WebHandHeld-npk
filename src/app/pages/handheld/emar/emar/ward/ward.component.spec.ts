/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WardComponent } from './ward.component';

describe('WardComponent', () => {
  let component: WardComponent;
  let fixture: ComponentFixture<WardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

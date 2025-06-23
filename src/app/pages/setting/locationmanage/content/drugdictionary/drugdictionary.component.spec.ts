import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugdictionaryComponent } from './drugdictionary.component';

describe('DrugdictionaryComponent', () => {
  let component: DrugdictionaryComponent;
  let fixture: ComponentFixture<DrugdictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrugdictionaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugdictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

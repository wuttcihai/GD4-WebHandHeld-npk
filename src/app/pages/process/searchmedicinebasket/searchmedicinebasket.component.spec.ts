import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmedicinebasketComponent } from './searchmedicinebasket.component';

describe('SearchmedicinebasketComponent', () => {
  let component: SearchmedicinebasketComponent;
  let fixture: ComponentFixture<SearchmedicinebasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchmedicinebasketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchmedicinebasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

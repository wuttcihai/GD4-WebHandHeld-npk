import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuprectiveshelfdescComponent } from './popuprectiveshelfdesc.component';

describe('PopuprectiveshelfdescComponent', () => {
  let component: PopuprectiveshelfdescComponent;
  let fixture: ComponentFixture<PopuprectiveshelfdescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopuprectiveshelfdescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopuprectiveshelfdescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

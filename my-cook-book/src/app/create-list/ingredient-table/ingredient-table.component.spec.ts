import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientTableComponent } from './ingredient-table.component';

describe('IngredientTableComponent', () => {
  let component: IngredientTableComponent;
  let fixture: ComponentFixture<IngredientTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientTableComponent]
    });
    fixture = TestBed.createComponent(IngredientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

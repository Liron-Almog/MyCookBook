import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowItemComponent } from './table-row-item.component';

describe('TableRowItemComponent', () => {
  let component: TableRowItemComponent;
  let fixture: ComponentFixture<TableRowItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableRowItemComponent]
    });
    fixture = TestBed.createComponent(TableRowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

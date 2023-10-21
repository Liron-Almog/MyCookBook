import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLogoComponent } from './my-logo.component';

describe('MyLogoComponent', () => {
  let component: MyLogoComponent;
  let fixture: ComponentFixture<MyLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLogoComponent]
    });
    fixture = TestBed.createComponent(MyLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

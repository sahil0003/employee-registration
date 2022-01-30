import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSSOComponent } from './employee-sso.component';

describe('EmployeeSSOComponent', () => {
  let component: EmployeeSSOComponent;
  let fixture: ComponentFixture<EmployeeSSOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSSOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

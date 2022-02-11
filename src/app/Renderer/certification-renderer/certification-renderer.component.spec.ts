import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationRendererComponent } from './certification-renderer.component';

describe('CertificationRendererComponent', () => {
  let component: CertificationRendererComponent;
  let fixture: ComponentFixture<CertificationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

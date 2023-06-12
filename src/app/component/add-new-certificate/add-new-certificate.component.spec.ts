import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCertificateComponent } from './add-new-certificate.component';

describe('AddNewCertificateComponent', () => {
  let component: AddNewCertificateComponent;
  let fixture: ComponentFixture<AddNewCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewCertificateComponent]
    });
    fixture = TestBed.createComponent(AddNewCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

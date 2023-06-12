import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesWithTagsComponent } from './certificates-with-tags.component';

describe('CertificatesWithTagsComponent', () => {
  let component: CertificatesWithTagsComponent;
  let fixture: ComponentFixture<CertificatesWithTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificatesWithTagsComponent]
    });
    fixture = TestBed.createComponent(CertificatesWithTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

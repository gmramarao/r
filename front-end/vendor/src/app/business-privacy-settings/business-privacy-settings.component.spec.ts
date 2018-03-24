import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPrivacySettingsComponent } from './business-privacy-settings.component';

describe('BusinessPrivacySettingsComponent', () => {
  let component: BusinessPrivacySettingsComponent;
  let fixture: ComponentFixture<BusinessPrivacySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPrivacySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPrivacySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

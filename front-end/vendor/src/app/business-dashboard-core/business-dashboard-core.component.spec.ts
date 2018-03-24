import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDashboardCoreComponent } from './business-dashboard-core.component';

describe('BusinessDashboardCoreComponent', () => {
  let component: BusinessDashboardCoreComponent;
  let fixture: ComponentFixture<BusinessDashboardCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDashboardCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDashboardCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

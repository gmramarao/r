import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSubHeaderComponent } from './business-sub-header.component';

describe('BusinessSubHeaderComponent', () => {
  let component: BusinessSubHeaderComponent;
  let fixture: ComponentFixture<BusinessSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

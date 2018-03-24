import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAnalysisComponent } from './visitor-analysis.component';

describe('VisitorAnalysisComponent', () => {
  let component: VisitorAnalysisComponent;
  let fixture: ComponentFixture<VisitorAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

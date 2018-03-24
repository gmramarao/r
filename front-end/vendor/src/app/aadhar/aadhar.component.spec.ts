import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharComponent } from './aadhar.component';

describe('AadharComponent', () => {
  let component: AadharComponent;
  let fixture: ComponentFixture<AadharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AadharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

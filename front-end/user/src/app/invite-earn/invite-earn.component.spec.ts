import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteEarnComponent } from './invite-earn.component';

describe('InviteEarnComponent', () => {
  let component: InviteEarnComponent;
  let fixture: ComponentFixture<InviteEarnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteEarnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteEarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

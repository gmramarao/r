import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPromotionsComponent } from './my-promotions.component';

describe('MyPromotionsComponent', () => {
  let component: MyPromotionsComponent;
  let fixture: ComponentFixture<MyPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

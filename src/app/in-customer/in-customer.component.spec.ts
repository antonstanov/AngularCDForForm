import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InCustomerComponent } from './in-customer.component';

describe('InCustomerComponent', () => {
  let component: InCustomerComponent;
  let fixture: ComponentFixture<InCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

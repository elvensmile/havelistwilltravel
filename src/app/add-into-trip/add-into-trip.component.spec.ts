import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntoTripComponent } from './add-into-trip.component';

describe('AddIntoTripComponent', () => {
  let component: AddIntoTripComponent;
  let fixture: ComponentFixture<AddIntoTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIntoTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntoTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

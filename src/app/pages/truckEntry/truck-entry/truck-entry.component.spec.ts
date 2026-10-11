import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckEntryComponent } from './truck-entry.component';

describe('TruckEntryComponent', () => {
  let component: TruckEntryComponent;
  let fixture: ComponentFixture<TruckEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilladdComponent } from './billadd.component';

describe('BilladdComponent', () => {
  let component: BilladdComponent;
  let fixture: ComponentFixture<BilladdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilladdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

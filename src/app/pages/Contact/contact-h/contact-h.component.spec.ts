import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHComponent } from './contact-h.component';

describe('ContactHComponent', () => {
  let component: ContactHComponent;
  let fixture: ComponentFixture<ContactHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PODPhotoComponent } from './podphoto.component';

describe('PODPhotoComponent', () => {
  let component: PODPhotoComponent;
  let fixture: ComponentFixture<PODPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PODPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PODPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

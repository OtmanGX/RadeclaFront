import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationdialogComponent } from './reservationdialog.component';

describe('ReservationdialogComponent', () => {
  let component: ReservationdialogComponent;
  let fixture: ComponentFixture<ReservationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

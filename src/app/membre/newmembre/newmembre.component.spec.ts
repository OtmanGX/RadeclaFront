import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmembreComponent } from './newmembre.component';

describe('NewmembreComponent', () => {
  let component: NewmembreComponent;
  let fixture: ComponentFixture<NewmembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

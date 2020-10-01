import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresStatsComponent } from './membres-stats.component';

describe('MembresStatsComponent', () => {
  let component: MembresStatsComponent;
  let fixture: ComponentFixture<MembresStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembresStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembresStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

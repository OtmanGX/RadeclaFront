import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingStatsComponent } from './lighting-stats.component';

describe('LightingStatsComponent', () => {
  let component: LightingStatsComponent;
  let fixture: ComponentFixture<LightingStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightingStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

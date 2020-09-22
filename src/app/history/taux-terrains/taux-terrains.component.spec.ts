import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxTerrainsComponent } from './taux-terrains.component';

describe('TauxTerrainsComponent', () => {
  let component: TauxTerrainsComponent;
  let fixture: ComponentFixture<TauxTerrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TauxTerrainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TauxTerrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

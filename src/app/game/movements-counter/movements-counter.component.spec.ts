import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsCounterComponent } from './movements-counter.component';

describe('MovementsCounterComponent', () => {
  let component: MovementsCounterComponent;
  let fixture: ComponentFixture<MovementsCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

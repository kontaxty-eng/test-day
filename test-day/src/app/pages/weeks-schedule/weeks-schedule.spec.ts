import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeksSchedule } from './weeks-schedule';

describe('WeeksSchedule', () => {
  let component: WeeksSchedule;
  let fixture: ComponentFixture<WeeksSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeksSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeksSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

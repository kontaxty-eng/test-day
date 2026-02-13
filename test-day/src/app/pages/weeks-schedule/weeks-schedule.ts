import { Component } from '@angular/core';
import { WeeksSchedule } from '../../feature/weeks-schedule/components/schedule/weeks-schedule';

@Component({
  selector: 'app-weeks-schedule-page',
  imports: [WeeksSchedule],
  templateUrl: './weeks-schedule.html',
  styleUrl: './weeks-schedule.scss',
})
export class WeeksSchedulePage {

}

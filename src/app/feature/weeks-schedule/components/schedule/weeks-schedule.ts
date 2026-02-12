import { Component, signal } from '@angular/core';
import { Medicines, WeekDays } from '../../models/medicines';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-weeks-schedule',
  imports: [MatCardModule, MatIconModule, ReactiveFormsModule, MatFormField, MatInputModule, MatSelectModule, DatePipe, MatTimepickerModule, MatFormFieldModule],
  templateUrl: './weeks-schedule.html',
  styleUrl: './weeks-schedule.scss',
})
export class WeeksSchedule {
  form: FormGroup
  weekDays = Object.values(WeekDays);
  showForm = signal(false);
  weeksSchedule = signal<Medicines[]>([
    { id: 1, name: 'Medicine 1', time: new Date, dose: '1 pill', day: WeekDays.Monday },
    { id: 2, name: 'Medicine 2', time: new Date, dose: '2 pills', day: WeekDays.Tuesday },
    { id: 3, name: 'Medicine 3', time: new Date, dose: '1 pill', day: WeekDays.Wednesday },
  ]);
  doseOptions = Array.from({length: 20}, (_, i) => i + 1);

  constructor() {
    this.form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        time: new FormControl('', Validators.required),
        dose: new FormControl('', Validators.required),
        day: new FormControl('', Validators.required)
    });
  }

  public getMedicinesByDay(day: WeekDays): Medicines[] {
      return this.weeksSchedule().filter(medicine => medicine.day === day);
  }

  public removeMedicine(id: number): void {
    this.weeksSchedule.update(medicines => medicines.filter(medicine => medicine.id !== id));
  }

  public addMedicine(): void {
    if (this.form.valid) {
      const newMedicine: Medicines = {
        id: this.weekDays.length + 1,
        name: this.form.value.name,
        time: this.form.value.time,
        dose: this.form.value.dose,
        day: this.form.value.day
      };
      this.weeksSchedule.update(medicines => [...medicines, newMedicine]);
      this.form.reset();
      this.form.markAsUntouched();
      this.form.markAsPristine();
    }
  }

  public hideForm(): void {
    this.showForm.set(!this.showForm());
  }

}

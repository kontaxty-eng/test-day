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
import { MedicinesService } from '../../services/medicines.service';

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
  weeksSchedule = signal<Medicines[]>([]);
  doseOptions = Array.from({length: 20}, (_, i) => i + 1);

  constructor(
    private medicinesService: MedicinesService
  ) {
    this.form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        time: new FormControl('', Validators.required),
        dose: new FormControl('', Validators.required),
        day: new FormControl('', Validators.required)
    });
    this.getMedicines();
  }

  public getMedicines(): void {
      this.medicinesService.getAllMedicines().subscribe(medicines => this.weeksSchedule.set(medicines));
  }

  public getMedicinesByDay(day: WeekDays): Medicines[] {
      return this.weeksSchedule().filter(medicine => medicine.day === day);
  }

  public removeMedicine(id: number): void {
    console.log('1');
    
      this.medicinesService.deleteMedicine(id.toString()).subscribe(() => {
          this.weeksSchedule.update(medicines => medicines.filter(medicine => medicine._id !== id));
      });
  }

  public addMedicine(): void {
    if (this.form.valid) {
      const newMedicine: Medicines = {
        _id: this.weekDays.length + 1,
        name: this.form.value.name,
        time: this.form.value.time,
        dose: this.form.value.dose,
        day: this.form.value.day
      };
      try {
        this.medicinesService.createMedicine(newMedicine).subscribe(createdMedicine => {
          this.weeksSchedule.update(medicines => [...medicines, createdMedicine]);
          this.form.reset();
          this.form.markAsUntouched();
          this.form.markAsPristine();
        });
      } catch (error) {
        console.error('Error creating medicine:', error);
      }
    }
  }

  public hideForm(): void {
    this.showForm.set(!this.showForm());
  }

}

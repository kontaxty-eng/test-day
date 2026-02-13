import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicines } from '../models/medicines';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {
  private apiUrl = 'http://localhost:3000/medicines';

  constructor(private http: HttpClient) { }

  getAllMedicines(): Observable<Medicines[]> {
    return this.http.get<Medicines[]>(this.apiUrl);
  }

  getMedicineById(id: string): Observable<Medicines> {
    return this.http.get<Medicines>(`${this.apiUrl}/${id}`);
  }

  createMedicine(medicine: Omit<Medicines, 'id'>): Observable<Medicines> {
    return this.http.post<Medicines>(this.apiUrl, medicine);
  }

  updateMedicine(id: string, medicine: Partial<Medicines>): Observable<Medicines> {
    return this.http.put<Medicines>(`${this.apiUrl}/${id}`, medicine);
  }

  deleteMedicine(id: string): Observable<any> {
    console.log('2');
    
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

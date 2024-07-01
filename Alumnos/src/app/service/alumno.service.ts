import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl = 'http://localhost:8080/api/alumnos';

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAlumno(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAlumno(alumno: any): Observable<any> {
    return this.http.post(this.apiUrl, alumno);
  }

  updateAlumno(id: number, alumno: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, alumno);
  }

  deleteAlumno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
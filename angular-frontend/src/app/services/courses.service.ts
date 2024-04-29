import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = '${environment.apiUrl}/cursos'; // Asegúrate de que la URL sea la correcta

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    // Uso correcto de backticks para la interpolación de variables
    return this.http.get<Curso[]>(`${environment.apiUrl}/cursos`);
  }
  
  getStudentCursos(studentId: number): Observable<Curso[]> {
    // Uso correcto de backticks para la interpolación de variables
    return this.http.get<Curso[]>(`${environment.apiUrl}/estudiantes/${studentId}/cursos`);
  }

  addCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  updateCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${curso.id}`, curso);
  }

  deleteCurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

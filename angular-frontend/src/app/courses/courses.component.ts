import { Component, OnInit } from '@angular/core';
import { Curso } from '../models/curso.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CursoService } from '../services/courses.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  cursos: Curso[] = [];
  selectedCurso: Curso | null = null;
  currentSortField: string = '';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  constructor(private cursoService: CursoService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursoService.getCursos().subscribe(
      cursos => this.cursos = cursos,
      error => console.error('Error al cargar los cursos:', error)
    );
  }

  selectCurso(curso: Curso | null): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.selectedCurso = curso ? { ...curso } : this.createEmptyCurso();
    }
  }

  deleteCurso(id: number): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      // Mensaje de confirmación antes de proceder con la eliminación
      if (confirm('¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.')) {
        this.cursoService.deleteCurso(id).subscribe(
          () => {
            this.loadCursos(); // Recarga la lista de cursos
            console.log('Curso eliminado con éxito');
          },
          error => console.error('Error al eliminar el curso:', error)
        );
      }
    }
  }
  
  
  saveCurso(form: NgForm): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      if (form.valid) {
        if (this.selectedCurso) {
          const cursoRequest = this.selectedCurso.id 
            ? this.cursoService.updateCurso(this.selectedCurso) 
            : this.cursoService.addCurso(this.selectedCurso);
  
          cursoRequest.subscribe(
            (updatedCurso: Curso) => { // Asumiendo que el servidor devuelve el curso actualizado
              if (this.selectedCurso?.id) {
                // Encuentra el índice del curso actualizado y reemplázalo
                const index = this.cursos.findIndex(curso => curso.id === this.selectedCurso?.id);
                if (index !== -1) {
                  this.cursos[index] = updatedCurso;
                }
              } else {
                // Si es un curso nuevo, añádelo a la lista
                this.cursos.push(updatedCurso);
              }
              this.sortCursos(this.currentSortField); // Reordena la lista
              this.selectedCurso = null;
            },
            error => console.error('Error al guardar el curso:', error)
          );
        }
      } else {
        this.markFormGroupTouched(form);
      }
    }
  }
  
  
  


  
  createEmptyCurso(): Curso {
    return {
      id: 0,
      nombre: '',
      horario: '',
      fecha_inicio: this.getCurrentDateString(), 
      fecha_fin: this.getCurrentDateString(),    
      tipo: 'Virtual' // O 'Presencial' 
    };
  }

  private getCurrentDateString(): string {
    return new Date().toISOString().split('T')[0];
  }


  sortCursos<K extends keyof Curso>(field: K): void {
    // Convertir el field a string para asignarlo a currentSortField
    const fieldStr = field as string;
  
    if (this.currentSortField === fieldStr) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortField = fieldStr;
      this.currentSortDirection = 'asc';
    }
  
    this.cursos = this.cursos.sort((a, b) => {
      // Utiliza String() para garantizar la comparación como cadenas
      const valA = String(a[field]);
      const valB = String(b[field]);
  
      if (valA < valB) return this.currentSortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.currentSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  

  private markFormGroupTouched(formGroup: NgForm): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cancel(): void {
    this.selectedCurso = null;
  }
}

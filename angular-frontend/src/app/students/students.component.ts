import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../models/student.model';
import { FormsModule, NgForm } from '@angular/forms'; // Asegúrate de importar NgForm
import { CommonModule } from '@angular/common';
import { CursoService } from '../services/courses.service'; 
import { Curso } from '../models/curso.model'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StudentsService } from '../services/students.service'; 
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';





@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class StudentsComponent implements OnInit {

  @ViewChild('selectCursos') selectCursos!: NgModel;

  selectedStudent: Student | null = null;



  cursos: Curso[] = [];
  students: Student[] = [];
  selectedCursos: any[] = [];
  cursosSeleccionados: string = '';

  constructor(private studentsService: StudentsService, private cursoService: CursoService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.loadCursos(); 
    this.loadStudents();
  }

  loadCursos(): void {
    this.cursoService.getCursos().subscribe(
      cursos => this.cursos = cursos,
      error => console.error('Error al cargar los cursos:', error)
    );
  }
  loadStudents(): void {
    this.studentsService.getStudents().subscribe(
      students => this.students = students.map(student => ({ ...student, cursosAsociados: [] })),
      error => console.error('Error al cargar los estudiantes:', error)
    );
  }

  loadStudentCourses(student: Student): void {
    // Asegúrate de que el ID del estudiante no es nulo ni indefinido
    if (student.id != null && (!student.cursosAsociados || student.cursosAsociados.length === 0)) {
      this.cursoService.getStudentCursos(student.id).subscribe(
        cursos => student.cursosAsociados = cursos,
        error => console.error('Error al cargar cursos para el estudiante:', error)
      );
    }
  }
  
  

  createNewStudent(): Student {
    return { id: null, nombre: '', apellido: '', edad: null, cedula: '', email: '', cursosAsociados: [] };
  }
  
  selectStudent(student: Student | null): void {
    
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.selectedStudent = student ? { ...student } : this.createNewStudent();
    }
  }
  
  deleteStudent(id: number | null | undefined): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      if (id !== null && id !== undefined) {
        // Agregar un cuadro de diálogo de confirmación
        if (confirm('¿Estás seguro de querer eliminar este estudiante? Esta acción no se puede deshacer.')) {
          this.studentsService.deleteStudent(id).subscribe(
            () => {
              this.loadStudents(); // Recarga la lista de estudiantes después de eliminar.
              console.log('Estudiante eliminado exitosamente');
            },
            error => {
              console.error('Error al eliminar el estudiante:', error);
            }
          );
        }
      } else {
        console.error('El ID del estudiante es nulo o indefinido');
      }
    }
  }
 

  saveStudent(form: NgForm): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else if (form.valid && this.selectedStudent) {
      // Asigna los cursos seleccionados al estudiante seleccionado antes de guardar
      this.selectedStudent.cursosAsociados = this.selectedCursos;
  
      // Aquí necesitarías asegurarte de que estás enviando la información en el formato que tu backend espera
      // Si tu backend espera un array de IDs de cursos, entonces deberías transformar el array de objetos curso
      // a un array de IDs.
      const cursosIds = this.selectedStudent.cursosAsociados.map(curso => curso.id);
  
      const studentData = {
        ...this.selectedStudent,
        cursos: cursosIds  // Asegúrate de que el backend espera una propiedad llamada "cursos"
      };
  
      let saveObservable: Observable<Student>;
      if (this.selectedStudent.id) {
        saveObservable = this.studentsService.updateStudent(studentData);
      } else {
        saveObservable = this.studentsService.addStudent(studentData);
      }
  
      saveObservable.subscribe(
        () => {
          this.loadStudents();  // Recarga la lista de estudiantes después de guardar.
          this.selectedStudent = null; // Restablece el estudiante seleccionado
        },
        error => {
          console.error('Error al guardar el estudiante:', error);
        }
      );
    } else {
      this.markFormGroupTouched(form);
    }
  }
  
  
  


  private markFormGroupTouched(formGroup: NgForm): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cancel(): void {
    this.selectedStudent = null;
  }



  toggleCurso(event: MouseEvent): void {
    event.preventDefault();

    const option = event.target as HTMLOptionElement;

    // Aquí necesitas asegurarte de que estás trabajando con el valor correcto del curso,
    // lo cual depende de cómo estás almacenando los cursos en selectedCursos.
    // Si son objetos, deberías buscar por alguna propiedad, no directamente el valor del option.

    const curso = this.cursos.find(c => c.nombre === option.label);
    if (!curso) return;

    const index = this.selectedCursos.indexOf(curso);
    if (index > -1) {
      this.selectedCursos.splice(index, 1);
      option.selected = false;
    } else {
      this.selectedCursos.push(curso);
      option.selected = true;
    }

    // Esta línea asume que selectCursos es una instancia de NgModel,
    // por lo que tienes que verificar que se ha inicializado correctamente.
    if (this.selectCursos) {
      this.selectCursos.control.setValue(this.selectedCursos);
    }
  }
  
  isSelected(curso: any): boolean {
    return this.selectedStudent?.cursosAsociados?.includes(curso) ?? false;
  }
  
  getCursosSeleccionados(): string {
    return this.selectedStudent?.cursosAsociados?.map(c => c.nombre).join(', ') ?? '';
  }

  updateCursosSeleccionados() {
    this.cursosSeleccionados = this.selectedCursos.map(c => c.nombre).join(', ');
  }
  
  
}

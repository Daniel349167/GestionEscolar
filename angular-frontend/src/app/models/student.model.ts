// students.model.ts
import { Curso } from './curso.model';  

export interface Student {
  id?: number | null; // Permitir `number`, `undefined`, o `null`
  nombre: string;
  apellido?: string;
  edad: number | null;
  cedula: string;
  email: string;
  cursosAsociados?: Curso[] | null; 
}

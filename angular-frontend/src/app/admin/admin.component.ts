import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Admin } from '../models/admin.model';


@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [
    CommonModule, // Necesario para funcionalidades básicas de Angular
    FormsModule // Para usar formularios con [(ngModel)]
  ]
})
export class AdminComponent implements OnInit {
  admins: Admin[] = [];
  selectedAdmin: Admin | null = null;

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías cargar los administradores existentes, por ejemplo, desde una API
  }

  selectAdmin(admin: Admin | null): void {
    this.selectedAdmin = admin ? { ...admin } : this.createNewAdmin();
  }

  createNewAdmin(): Admin {
    return {
      id: undefined, // Cambiado de null a undefined
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    };
  }
  

  saveAdmin(): void {
    if (this.selectedAdmin) {
      if (this.selectedAdmin.id) {
        const index = this.admins.findIndex(a => a.id === this.selectedAdmin!.id); 
        if (index !== -1) {
          this.admins[index] = this.selectedAdmin;
        }
      } else {
        const newId = this.admins.length > 0 ? Math.max(...this.admins.map(a => a.id || 0)) + 1 : 1;
        this.selectedAdmin.id = newId;
        this.admins.push(this.selectedAdmin);
      }
      this.selectedAdmin = null;
    }
  }
  

  deleteAdmin(id: number | null | undefined): void {
    if (id === null || id === undefined) {
      // Manejar el caso en que el id no es válido, podría ser mostrar un mensaje de error
      console.error('No se puede eliminar: el id es nulo o indefinido.');
      return;
    }
    // Procede con la eliminación si el id es válido
    this.admins = this.admins.filter(admin => admin.id !== id);
  }
  

  cancel(): void {
    this.selectedAdmin = null;
  }
}

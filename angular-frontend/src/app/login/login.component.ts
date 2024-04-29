import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importa Router
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router 
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = null;

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      this.authService.login(email, password).subscribe({
        next: (user) => {
          this.loading = false;
          console.log("llega")
          this.router.navigate(['/dashboard']); // Asegúrate de que esta ruta existe en tu configuración de rutas.
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Error al iniciar sesión: ' + error.message; // Asegúrate de mostrar el mensaje de error real desde el servidor si es posible.
        }
      });
      
    } else {
      this.loading = false;
      this.errorMessage = 'Por favor, corrige los errores en el formulario.';
    }
  }

  getError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName);
    return control && control.touched && control.errors ? control.errors[errorName] : null;
  }  
}

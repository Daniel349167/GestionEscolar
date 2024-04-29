import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterLinkActive,
    HttpClientModule 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavbar = true; // Propiedad para controlar la visibilidad de la navbar

  constructor(public authService: AuthService, private router: Router) {
    // Suscripción a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar navbar si la ruta es '/login'
        this.showNavbar = !event.urlAfterRedirects.includes('/login');
      }
    });
  }

  title = 'angular-frontend';
}

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { importProvidersFrom} from '@angular/core';

const config = {
  providers: [
    importProvidersFrom(
      CommonModule,
      HttpClientModule,
      FormsModule,
    ),
    provideRouter(appRoutes),
  ],
};

bootstrapApplication(AppComponent, config).catch(err => console.error(err));

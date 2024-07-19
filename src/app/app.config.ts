import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { ApiInterceptor } from './Core/shared/api.interceptor';
import { AuthInterceptor } from './Core/Auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimations(),
    provideHttpClient(
      withInterceptors([
        ApiInterceptor, AuthInterceptor
      ])
    ),
    MessageService
  ]
};

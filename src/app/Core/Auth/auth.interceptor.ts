import { ApiSuccess } from './../shared/api-response';
import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { AuthResponse } from './Auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment.development';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const router = inject(Router)
  const jwt = authService.getToken();
  const baseUrl = environment.baseUrl;
  const source = req.headers.get('X-Source') || 'Unknown'

  let authRequest = req

  if (req.url.startsWith(baseUrl)) {
    authRequest = req.clone({
      setHeaders: {
        authorization: `Bearer ${jwt}`
      }
    })
  }

  if (source == 'auth.register' || source == 'auth.login') {
    return next(authRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const response: ApiSuccess = event.body
          const authResponse = response.data as AuthResponse;
          authService.setToken(authResponse.accessToken)
          authService.authenticate();
        }
        return event
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          router.navigateByUrl('auth/sign-in')
        }
        return throwError(() => err)
      })
    )
  }

  return next(authRequest).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigateByUrl('auth/sign-in')
      }
      return throwError(() => err)
    })
  )

};

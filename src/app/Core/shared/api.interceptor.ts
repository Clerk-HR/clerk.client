import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { ApiCallStateService } from '../shared/api-call-state.service';
import { MessageService } from 'primeng/api';
import { catchError, map, throwError } from 'rxjs';
import { ApiError, ApiSuccess } from './api-response';

export const ApiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiCallStateService = inject(ApiCallStateService)
  const messageService = inject(MessageService)

  const source = req.headers.get('X-Source') || 'Unknown'

  apiCallStateService.initialize(source)

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const response: ApiSuccess = event.body
        apiCallStateService.update(source, true, response)
        messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message
        })
      }
      return event
    }),

    catchError((error: HttpErrorResponse) => {
      const response: ApiError = error.error
      apiCallStateService.update(source, false, response)
      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'something went wrong'
      })
      return throwError(() => new Error(error.message))
    })
  )
};

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSuccess } from '../shared/api-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  baseUrl = environment.baseUrl + "/auth";

  http = inject(HttpClient)

  registerUser(dto: object): Observable<ApiSuccess> {
    const headers = new HttpHeaders().set('X-Source', 'auth.register');
    return this.http.post<ApiSuccess>(`${this.baseUrl}`, dto, { headers })
  }

}

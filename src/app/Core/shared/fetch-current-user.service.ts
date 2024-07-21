import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiSuccess } from './api-response';

@Injectable({
  providedIn: 'root'
})
export class FetchCurrentUserService {

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  fetchCurrentUser(): Observable<ApiSuccess> {
    const headers = new HttpHeaders().set('X-Source', 'user.current');
    return this.http.get<ApiSuccess>(`${this.baseUrl}/users/current-user`, { headers });
  }

}

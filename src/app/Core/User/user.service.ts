import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSuccess } from '../shared/api-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {
  }
  http = inject(HttpClient)

  baseUrl = environment.baseUrl + "/users"

  fetchCurrentUser(): Observable<ApiSuccess> {
    return this.http.get<ApiSuccess>(`${this.baseUrl}/current-user`);
  }

}

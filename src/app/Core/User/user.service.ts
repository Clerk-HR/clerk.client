import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSuccess } from '../shared/api-response';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {
  }
  http = inject(HttpClient)
  authService = inject(AuthService)
  router = inject(Router)
  baseUrl = environment.baseUrl + "/users"

  PostUserDetails(dto: object) {
    const headers = new HttpHeaders().set('X-Source', 'onboarding.details');
    this.http.post<ApiSuccess>(`${this.baseUrl}/user-details`, dto, { headers }).subscribe(
      {
        next: (response: ApiSuccess) => {
          this.authService.updateCurrentUser();
          this.router.navigateByUrl('on-boarding/join-create')
        }
      }
    );
  }

  getCurrentUser = (): User | null => {
    const user = sessionStorage.getItem("clerk_profile") as string;
    const parsedUser = JSON.parse(user) as User;

    if (parsedUser == null || undefined) {
      return null
    }

    return parsedUser;

  }
}

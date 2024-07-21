import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../Auth/auth.service';
import { environment } from '../../../environments/environment.development';
import { ApiSuccess } from '../shared/api-response';
import { User } from '../User/user';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor() { }

  http = inject(HttpClient)
  authService = inject(AuthService)
  router = inject(Router)
  baseUrl = environment.baseUrl + "/organizations"
  userProfileKey = "clerk_profile"

  createOrganization(dto: object) {
    const headers = new HttpHeaders().set('X-Source', 'organization.create');
    this.http.post<ApiSuccess>(`${this.baseUrl}`, dto, { headers }).subscribe(
      () => {
        this.authService.updateCurrentUser().subscribe(response => {
          const user = response.data as User
          sessionStorage.setItem(this.userProfileKey, JSON.stringify(user));
          this.router.navigateByUrl('app')
        })
      }
    );
  }


  joinOrganization(dto: object) {
    const headers = new HttpHeaders().set('X-Source', 'organization.join');
    this.http.post<ApiSuccess>(`${this.baseUrl}/join`, dto, { headers }).subscribe(
      () => {
        this.authService.updateCurrentUser().subscribe(response => {
          const user = response.data as User
          sessionStorage.setItem(this.userProfileKey, JSON.stringify(user));
          this.router.navigateByUrl('app')
        })
      }
    );
  }
}

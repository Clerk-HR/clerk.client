import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { AuthService } from './Auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiSuccess } from './shared/api-response';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor() { }

  http = inject(HttpClient)
  authService = inject(AuthService)
  router = inject(Router)
  baseUrl = environment.baseUrl + "/organizations"

  CreateOrganization(dto: object) {
    const headers = new HttpHeaders().set('X-Source', 'organization.create');
    this.http.post<ApiSuccess>(`${this.baseUrl}`, dto, { headers }).subscribe(
      {
        next: (response: ApiSuccess) => {
          
          this.authService.updateCurrentUser();
          this.router.navigateByUrl('app')
        }
      }
    );
  }
}

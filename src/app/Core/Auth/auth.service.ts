import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiSuccess } from '../shared/api-response';
import { environment } from '../../../environments/environment.development';
import { OnBoarding, User } from '../User/user';
import { AuthStatus } from './Auth';
import { Router } from '@angular/router';
import { UserService } from '../User/user.service';
import { Role } from '../User/member';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  router = inject(Router)
  userService = inject(UserService)

  constructor() {
    this.initAuthStatus()
  }

  baseUrl = environment.baseUrl + "/auth";
  private readonly tokenKey = 'access_token'
  private readonly userProfileKey = 'clerk_profile'

  private authstatusSubject = new BehaviorSubject<AuthStatus>({ isAuthenticated: false, roles: [], user: null, onBoarding: OnBoarding.CreateAccount })
  public authStatus = this.authstatusSubject.asObservable();

  private initAuthStatus() {
    const token = this.getToken();
    if (token) {
      this.userService.fetchCurrentUser().subscribe({
        next: (response) => {
          const user = response.data as User
          this.authstatusSubject.next({ isAuthenticated: true, roles: [], user: user, onBoarding: user.onBoarding })
          sessionStorage.setItem(this.userProfileKey, JSON.stringify(user));

          switch (user.onBoarding) {
            case OnBoarding.UserDetails:
              this.router.navigateByUrl('onboarding/user-details')
              break;
            case OnBoarding.Organization:
              this.router.navigateByUrl('onboarding/organization')
              break;
            case OnBoarding.Complete:
              this.router.navigateByUrl(`app/${user.Profile.organization.id}`)
              break;
            default:
              break;
          }
        },
        error: (err) => {
          console.log(err);

          this.logout();
        }
      })
    }
  }

  setToken(accessToken: string) {
    localStorage.setItem(this.tokenKey, accessToken)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  register(dto: object): Observable<ApiSuccess> {
    const headers = new HttpHeaders().set('X-Source', 'auth.register');
    return this.http.post<ApiSuccess>(`${this.baseUrl}/register`, dto, { headers })
  }

  login(dto: object): Observable<ApiSuccess> {
    const headers = new HttpHeaders().set('X-Source', 'auth.login');
    return this.http.post<ApiSuccess>(`${this.baseUrl}/login`, dto, { headers })
  }

  logout() {
    localStorage.removeItem(this.tokenKey)
    sessionStorage.removeItem(this.userProfileKey)

    this.authstatusSubject.next({
      isAuthenticated: false, roles: [], user: null, onBoarding: OnBoarding.CreateAccount
    })

    this.router.navigateByUrl('auth/sign-in')

  }

  authenticate() {

    this.userService.fetchCurrentUser().subscribe({
      next: (response) => {
        const user = response.data as User

        let roleToSet: Role[] = [Role.User]
        if (!(user.Profile == null || undefined)) {
          roleToSet = user.Profile.roles
        }
        
        this.authstatusSubject.next({ isAuthenticated: true, roles: roleToSet, user: user, onBoarding: user.onBoarding })
        sessionStorage.setItem(this.userProfileKey, JSON.stringify(user));
        switch (user.onBoarding) {
          case OnBoarding.UserDetails:
            this.router.navigateByUrl('onboarding/user-details')
            break;
          case OnBoarding.Organization:
            this.router.navigateByUrl('onboarding/organization')
            break;
          case OnBoarding.Complete:
            this.router.navigateByUrl(`onboarding/${user.Profile.organization.id}`)
            break;
          default:
            break;
        }
      }
    })
  }




}

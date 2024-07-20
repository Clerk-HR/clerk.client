import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, catchError } from 'rxjs';
import { ApiError, ApiSuccess } from '../shared/api-response';
import { environment } from '../../../environments/environment.development';
import { OnBoarding, User } from '../User/user';
import { AuthResponse, UserState } from './Auth';
import { Router } from '@angular/router';
import { Role } from '../User/member';
import { FetchCurrentUserService } from '../shared/fetch-current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  router = inject(Router)
  fetchCurrentUserService = inject(FetchCurrentUserService)


  baseUrl = environment.baseUrl + "/auth";
  private readonly tokenKey = 'access_token'
  private readonly userProfileKey = 'clerk_profile'

  private userStateSubject = new BehaviorSubject<UserState>({ isAuthenticated: false, roles: [], user: null, onBoarding: OnBoarding.CreateAccount })
  private userState = this.userStateSubject.asObservable();

  initAuthStatus() {
    const token = this.getToken();
    if (token) {
      console.log(token);
      this.fetchCurrentUserService.fetchCurrentUser().subscribe({
        next: (response) => {
          const user = response.data as User
          this.userStateSubject.next({ isAuthenticated: true, roles: [], user: user, onBoarding: user.onBoarding })
          sessionStorage.setItem(this.userProfileKey, JSON.stringify(user));

          switch (user.onBoarding) {
            case OnBoarding.UserDetails:
              this.router.navigateByUrl('on-boarding/user-details')
              break;
            case OnBoarding.JoinCreate:
              this.router.navigateByUrl('on-boarding/join-create')
              break;
            case OnBoarding.Complete:
              this.router.navigateByUrl(`app/${user.profile.organization.id}`)
              break;
            default:
              break;
          }
        },
        error: (err: HttpErrorResponse) => {
          const response = err.error as ApiError
          if (response.code == 401) {
            this.logout();
          }
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

  updateCurrentUser() {
    this.fetchCurrentUserService.fetchCurrentUser().subscribe({
      next: (response) => {
        const user = response.data as User
        this.userStateSubject.next({ isAuthenticated: true, roles: [], user: user, onBoarding: user.onBoarding })
        sessionStorage.setItem(this.userProfileKey, JSON.stringify(user));
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.logout();
          }
        }
      }
    })
  }

  register(dto: object) {
    const headers = new HttpHeaders().set('X-Source', 'auth.register');
    this.http.post<ApiSuccess>(`${this.baseUrl}/register`, dto, { headers }).subscribe({
      next: (response: ApiSuccess) => {
        const authResponse = response.data as AuthResponse;
        this.setToken(authResponse.accessToken)
        this.authenticate();
      },
      error: (err: HttpErrorResponse) => {
        return throwError(() => err)
      }
    })
  }

  login(dto: object) {
    const headers = new HttpHeaders().set('X-Source', 'auth.login');
    this.http.post<ApiSuccess>(`${this.baseUrl}/login`, dto, { headers }).subscribe({
      next: (response: ApiSuccess) => {
        const authResponse = response.data as AuthResponse;
        this.setToken(authResponse.accessToken)
        this.authenticate();
      },
      error: (err: HttpErrorResponse) => {
        return throwError(() => err)
      }
    })
  }

  logout() {
    localStorage.removeItem(this.tokenKey)
    sessionStorage.removeItem(this.userProfileKey)

    this.userStateSubject.next({
      isAuthenticated: false, roles: [], user: null, onBoarding: OnBoarding.CreateAccount
    })

    this.router.navigateByUrl('auth/sign-in')

  }

  authenticate() {
    this.fetchCurrentUserService.fetchCurrentUser().subscribe({
      next: (response) => {
        const user = response.data as User
        console.log(response.data);

        let roleToSet: Role[] = [Role.User]
        if (!(user.profile == null || undefined)) {
          roleToSet = user.profile.roles
        }

        this.userStateSubject.next({ isAuthenticated: true, roles: roleToSet, user: user, onBoarding: user.onBoarding })
        sessionStorage.setItem(this.userProfileKey, JSON.stringify(user));
        switch (user.onBoarding) {
          case OnBoarding.UserDetails:
            this.router.navigateByUrl('on-boarding/user-details')
            break;
          case OnBoarding.JoinCreate:
            this.router.navigateByUrl('on-boarding/join-create')
            break;
          case OnBoarding.Complete:
            this.router.navigateByUrl(`app}`)
            break;
          default:
            break;
        }
      }
    })
  }
}

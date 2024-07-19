import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  #http = Inject(HttpClient)
  baseUrl = environment.baseUrl;

  private userStateSubject: BehaviorSubject<User | null>;
  private userState$: Observable<User | null>;


  constructor() {
    this.userStateSubject = new BehaviorSubject<User | null>(null);
    this.userState$ = this.userStateSubject.asObservable();
  }
  
  
}

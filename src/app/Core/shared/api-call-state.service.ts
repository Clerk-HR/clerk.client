import { Injectable, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiError, ApiSuccess } from './api-response';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ApiCallStateService {

  constructor() {
  }


  private states: { [source: string]: ApiCallState } = {};
  private stateSubjects: { [source: string]: BehaviorSubject<ApiCallState> } = {};

  initialize(source: string) {
    this.states[source] = {
      awaitingResponse: true,
      success: null,
      data: null
    };
    if (!this.stateSubjects[source]) {
      this.stateSubjects[source] = new BehaviorSubject<ApiCallState>(this.states[source]);
    } else {
      this.stateSubjects[source].next(this.states[source]);
    }
  }

  update(source: string, success: boolean, data: any = null) {
    this.states[source] = {
      awaitingResponse: false,
      success,
      data
    };
    this.stateSubjects[source].next(this.states[source]);
  }

  reset(source: string) {
    this.states[source] = {
      awaitingResponse: false,
      success: null,
      data: null
    };
    this.stateSubjects[source].next(this.states[source]);
  }

  getState(source: string): Observable<ApiCallState> {
    if (!this.stateSubjects[source]) {
      this.stateSubjects[source] = new BehaviorSubject<ApiCallState>({
        awaitingResponse: false,
        success: null,
        data: null
      });
    }
    console.log(this.stateSubjects[source]);

    return this.stateSubjects[source].asObservable();
  }

}


export interface ApiCallState<T = ApiSuccess | ApiError> {
  awaitingResponse: boolean;
  success: boolean | null;
  data: T | null;
} 
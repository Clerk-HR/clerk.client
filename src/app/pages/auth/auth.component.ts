import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../Core/Auth/auth.service';
import { DialogModule } from 'primeng/dialog'
import { ApiCallState, ApiCallStateService } from '../../Core/shared/api-call-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, DialogModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  authService = inject(AuthService)

  ngOnInit(): void {
    this.authInitStateSubscription = this.apiCallService.getState('user.current').subscribe(
      (state: ApiCallState) => {
        this.authInitState = state;
        console.log(this.authInitState);
      }
    )
  this.authService.initAuthStatus();

  }

  private apiCallService = inject(ApiCallStateService);
  authInitState!: ApiCallState;
  authInitStateSubscription!: Subscription;



}

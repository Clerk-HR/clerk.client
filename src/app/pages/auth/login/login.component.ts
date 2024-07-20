import { Component, inject } from '@angular/core';
import { ApiCallState, ApiCallStateService } from '../../../Core/shared/api-call-state.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Core/Auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  ngOnInit(): void {
    this.loginStateSubscription = this.apiCallService.getState('auth.login').subscribe(
      (state: ApiCallState) => {
        this.loginState = state;
      }
    )
  }

  private apiCallService = inject(ApiCallStateService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);


  loginState?: ApiCallState;
  loginStateSubscription!: Subscription;
  showFormErrors = false;

  txtEmail = this.fb.control('', [Validators.required]);
  txtPassword = this.fb.control('', [Validators.required]);

  loginForm = this.fb.group({
    email: this.txtEmail,
    password: this.txtPassword
  });



  onSubmit() {
    if (this.loginForm.invalid) {
      this.showFormErrors = true;
      return;
    }
    this.authService.login(this.loginForm.value);
  }

}

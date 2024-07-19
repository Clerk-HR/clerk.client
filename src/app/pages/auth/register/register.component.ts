import { ApiError } from './../../../Core/shared/api-response';
import { ApiCallState, ApiCallStateService } from './../../../Core/shared/api-call-state.service';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast'
import { AuthService } from '../../../Core/Auth/auth.service';
import { subscribeOn, Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  constructor() {

  }
  ngOnInit(): void {
    this.registerStateSubscription = this.apiCallService.getState('auth.register').subscribe(
      (state: ApiCallState) => {
        this.registerState = state;

      }
    )
  }

  private apiCallService = inject(ApiCallStateService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);


  registerState?: ApiCallState;
  registerStateSubscription!: Subscription;
  showFormErrors = false;

  txtEmail = this.fb.control('', [Validators.required, Validators.email]);
  txtPassword = this.fb.control('', [Validators.required, Validators.minLength(6)],);

  registerForm = this.fb.group({
    email: this.txtEmail,
    password: this.txtPassword
  });



  onSubmit() {
    if (this.registerForm.invalid) {
      this.showFormErrors = true
      return;
    }
    this.authService.registerUser(this.registerForm.value).subscribe();
  }


}

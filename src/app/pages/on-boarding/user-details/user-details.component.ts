import { Component, inject } from '@angular/core';
import { ApiCallState, ApiCallStateService } from '../../../Core/shared/api-call-state.service';
import { AuthService } from '../../../Core/Auth/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../Core/User/user.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar'

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, AvatarModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  ngOnInit(): void {
    this.userDetailStateSubscription = this.apiCallService.getState('onboarding.details').subscribe(
      (state: ApiCallState) => {
        this.userDetailState = state;
      }
    )
  }

  private apiCallService = inject(ApiCallStateService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);


  userDetailState?: ApiCallState;
  userDetailStateSubscription!: Subscription;
  showFormErrors = false;

  cFullName = this.fb.control('', [Validators.required]);
  cContact = this.fb.control('', [Validators.required]);

  userDetailsForm = this.fb.group({
    FullName: this.cFullName,
    PhoneNumber: this.cContact
  });



  onSubmit() {
    if (this.userDetailsForm.invalid) {
      this.showFormErrors = true;
      return;
    }

    console.log(this.userDetailsForm.value);
    this.userService.PostUserDetails(this.userDetailsForm.value);
  }
}

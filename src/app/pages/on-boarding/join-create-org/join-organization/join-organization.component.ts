import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallState, ApiCallStateService } from '../../../../Core/shared/api-call-state.service';
import { OrganizationService } from '../../../../Core/Organization/organization.service';
import { Subscription } from 'rxjs';
import { InputOtp, InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-organization',
  standalone: true,
  imports: [InputOtpModule, ButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './join-organization.component.html',
  styleUrl: './join-organization.component.css'
})
export class JoinOrganizationComponent implements OnInit {
  ngOnInit(): void {
    this.joinStateSubscription = this.apiCallService.getState('organization.join').subscribe(
      (state: ApiCallState) => {
        this.joinState = state;
      }
    )
  }

  fb = inject(FormBuilder)
  apiCallService = inject(ApiCallStateService);
  organizationService = inject(OrganizationService);

  joinState?: ApiCallState;
  joinStateSubscription!: Subscription;
  cCode = this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)])
  showErrors: boolean = false;

  joinForm = this.fb.group({
    Code: this.cCode,
  });


  join() {
    if (this.cCode.invalid) {
      this.showErrors = true
      return
    }
    this.organizationService.joinOrganization(this.joinForm.value)
  }

}

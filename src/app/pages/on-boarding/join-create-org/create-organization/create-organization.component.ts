import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ApiCallState, ApiCallStateService } from '../../../../Core/shared/api-call-state.service';
import { Subscription } from 'rxjs';
import { OrganizationService } from '../../../../Core/Organization/organization.service';

@Component({
  selector: 'app-create-organization',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, AvatarModule],
  templateUrl: './create-organization.component.html',
  styleUrl: './create-organization.component.css'
})
export class CreateOrganizationComponent {
  ngOnInit(): void {
    this.createOrgSubscription = this.apiCallService.getState('organization.create').subscribe(
      (state: ApiCallState) => {
        this.createOrgState = state;
      }
    )
  }

  private apiCallService = inject(ApiCallStateService);
  private organizationService = inject(OrganizationService);
  private fb = inject(FormBuilder);


  createOrgState!: ApiCallState;
  createOrgSubscription!: Subscription;
  showFormErrors = false;

  cName = this.fb.control('', [Validators.required]);
  cDescription = this.fb.control('', [Validators.required]);

  orgForm = this.fb.group({
    Name: this.cName,
    Description: this.cDescription
  });


  onSubmit() {
    if (this.orgForm.invalid) {
      this.showFormErrors = true;
      return;
    }
    this.organizationService.createOrganization(this.orgForm.value);
  }
}

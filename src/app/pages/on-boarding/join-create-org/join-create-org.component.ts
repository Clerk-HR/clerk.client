import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputOtpModule } from 'primeng/inputotp'
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { JoinOrganizationComponent } from './join-organization/join-organization.component';

@Component({
  selector: 'app-join-create-org',
  standalone: true,
  imports: [DialogModule, InputOtpModule, ButtonModule, CreateOrganizationComponent, JoinOrganizationComponent],
  templateUrl: './join-create-org.component.html',
  styleUrl: './join-create-org.component.css'
})
export class JoinCreateOrgComponent  {


  showJoinDialog: boolean = false;
  showCreateOrg: boolean = false;

}



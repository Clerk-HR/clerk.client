import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps'

@Component({
  selector: 'app-on-boarding',
  standalone: true,
  imports: [RouterOutlet, StepsModule],
  templateUrl: './on-boarding.component.html',
  styleUrl: './on-boarding.component.css'
})
export class OnBoardingComponent {

  items: MenuItem[] = [
    {
      label: 'Profile',
      routerLink: 'user-details'
    },
    {
      label: 'Organization',
      routerLink: 'join-create'
    }
  ]
}

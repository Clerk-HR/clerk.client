import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu'

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterOutlet, TabMenuModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  router = inject(Router)
  items: MenuItem[] = [
    {
      label: "Manage",
      icon: 'pi pi-user-edit',
      routerLink: 'manage'
    },
    {
      label: "Leave",
      icon: 'pi pi-inbox',
      command: () => {
        this.router.navigateByUrl('leave')
      },
      routerLink: 'leave',
      badge: '5',
      badgeStyleClass: 'border-circle'
    }
  ]
}

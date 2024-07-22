import { Component, inject, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar'
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from './breadcrumb.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Menu } from 'primeng/menu';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, AvatarModule, BreadcrumbModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  home: MenuItem = {
    icon: 'pi pi-home'
  }
  items: MenuItem[] = [
    {
      label: 'Employees',
    }
    ,
    {
      label: 'Manage',
      isActive: 'true'
    }
  ];



}

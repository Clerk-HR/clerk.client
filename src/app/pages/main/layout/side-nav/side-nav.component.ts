import { Component, EventEmitter, Output } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu'
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel'
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge'
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [PanelMenuModule, MenuModule, PanelModule, BadgeModule, RippleModule, AvatarModule, RouterLink, ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

  // currentRoute: string;

  // constructor() {
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     this.currentRoute = this.router.url;
  //   });
  // }

  // isActiveRoute(route: string): boolean {
  //   // Normalize the route by removing any query params or hash fragments
  //   const normalizedCurrentRoute = this.currentRoute.split('?')[0].split('#')[0];
  //   return normalizedCurrentRoute === route;
  // }


  collapsed: boolean = localStorage.getItem('admin-nav') == 'true' ? true : false;

  @Output() inviteToogled = new EventEmitter<boolean>();

  toogleInvite() {
    this.inviteToogled.emit(true)
  }

  items: MenuItem[] = [
    {
      separator: true
  },
    {
      label: 'Main',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          routerLink: '.',
        },
        {
          label: 'Tasks',
          icon: 'pi pi-list-check',
          routerLink: 'tasks'
        }
      ]
    },
    {
      label: 'Employees',
      items: [
        {
          label: 'Manage',
          icon: 'pi pi-users',

        },
        {
          label: 'Leave',
          icon: 'pi pi-inbox',
          badge: '2'
        },
        {
          label: 'Attendance',
          icon: 'pi pi-sign-out',

        }
      ]
    },
    {
      label: 'Performance',
      items: [
        {
          label: 'Reports',
          icon: 'pi pi-chart-bar',

        }
      ]
    },
    {
      separator: true
    }
  ];
  toogleCollapse() {
    localStorage.setItem('admin-nav', !this.collapsed ? 'true' : 'false')
    this.collapsed = localStorage.getItem('admin-nav') == 'true'
  }

  settingsItems: MenuItem[] = [
    {
      label: "Settings",
      icon: 'pi pi-cog',
      items: [
        {
          label: "Company",
          icon: 'pi-building',
        }, {
          label: 'Invite',
          icon: 'pi pi-qr-code'
        }
      ]
    }
  ]

}


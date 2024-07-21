import { Component } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu'
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel'
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge'

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [PanelMenuModule, MenuModule, PanelModule, BadgeModule, RippleModule, AvatarModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

  collapsed: boolean = localStorage.getItem('admin-nav') == 'true' ? true : false;


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
        },
        {
          label: 'Tasks',
          icon: 'pi pi-list-check',
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


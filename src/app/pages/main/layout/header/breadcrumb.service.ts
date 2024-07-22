import { EventEmitter, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  items: MenuItem[] = [];

  public breadcrumbChanged: EventEmitter<MenuItem[]> = new EventEmitter<MenuItem[]>();

  getBreadcrumb(): MenuItem[] {
    return this.items;
  }

  setBreadcrumb(breadCrumb: MenuItem[]): void {
    this.items = breadCrumb;
    this.breadcrumbChanged.next(this.items)
  }
}

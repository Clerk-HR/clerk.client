import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { Member, Role } from '../../../Core/User/member';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterOutlet, TableModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {


}

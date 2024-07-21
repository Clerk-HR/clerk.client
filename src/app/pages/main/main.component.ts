import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/Auth/auth.service';
import { User } from '../../Core/User/user';
import { UserService } from '../../Core/User/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { HeaderComponent } from './layout/header/header.component';
import { DialogModule } from 'primeng/dialog';
import { InputOtp, InputOtpModule } from 'primeng/inputotp';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SideNavComponent, HeaderComponent, RouterOutlet, DialogModule, InputOtpModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser() as User;
    if (this.currentUser == null) {
      this.router.navigateByUrl('auth/sign-in')
    }
    console.log(this.currentUser);

  }

  
  

  showInviteDialog: boolean = false;

  userService = inject(UserService)
  router = inject(Router)

  currentUser!: User;

}

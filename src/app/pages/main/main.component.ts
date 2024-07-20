import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/Auth/auth.service';
import { User } from '../../Core/User/user';
import { UserService } from '../../Core/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
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

  userService = inject(UserService)
  router = inject(Router)

  currentUser!: User;

}

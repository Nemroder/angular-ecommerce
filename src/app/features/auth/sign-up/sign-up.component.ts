import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { Router } from '@angular/router';

import { NotificationService } from '../../../core/services/notification.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.username || this.username.trim() === '') {
      this.notificationService.addNotification('Username cannot be empty!');
      return;
    }
    if (!this.password || this.password.trim() === '') {
      this.notificationService.addNotification('Password cannot be empty!');
      return;
    }
    if (!this.confirmPassword || this.confirmPassword.trim() === '') {
      this.notificationService.addNotification('Confirm Password cannot be empty!');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.notificationService.addNotification('Passwords do not match!');
      return;
    }

    const newUser: User = {
      username: this.username,
      password: this.password,
      role: 'cliente',
      isActive: true
    };

    if (this.userService.addUser(newUser)) {
      this.notificationService.addNotification('User has been created successfully!');
      this.router.navigate(['/login'], { queryParams: { message: 'User has been created successfully!' } });
    } else {
      this.notificationService.addNotification('User already exists!');
    }
  }

  users: User[] = [];

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}

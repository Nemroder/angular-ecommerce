import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

import { NotificationService, Notification } from '../../../core/services/notification.service';
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
  
  notifications: Notification[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications(); // Obtener notificaciones existentes
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.username.trim()) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Username cannot be empty!'
      });
      return;
    }
    if (!this.password.trim()) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Password cannot be empty!'
      });
      return;
    }
    if (!this.confirmPassword.trim()) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Confirm Password cannot be empty!'
      });
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Passwords do not match!'
      });
      return;
    }


    const newUser: User = {
      username: this.username,
      password: this.password,
      role: 'cliente',
      isActive: true
    };

     if (this.userService.addUser(newUser)) {
      this.notificationService.addNotification({
        type: '',
        position: '',
        text: ''
      });
      this.router.navigate(['/login'], { queryParams: { message: 'User has been created successfully!' } });
    } else {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'User already exists!'
      });
    }
  }

  // Método para obtener las clases CSS basadas en el tipo de notificación
  getNotificationClasses(notification: Notification): string {
    return `notification ${notification.type}`;
  }
}

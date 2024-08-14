import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

import { NotificationService, Notification } from '../../../core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;

  notifications: Notification[] = [];
  private subscription: Subscription | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.subscription = this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.username.trim()) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Username cannot be empty!',
      });
      return;
    }
    if (!this.password.trim()) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Password cannot be empty!',
      });
      return;
    }
    if (!this.confirmPassword.trim()) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Confirm Password cannot be empty!',
      });
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Passwords do not match!',
      });
      return;
    }

    const newUser: User = {
      username: this.username,
      password: this.password,
      role: 'cliente',
      isActive: true,
    };

    if (this.userService.addUser(newUser)) {
      this.router.navigate(['/login'], { queryParams: { message: 'User has been created successfully!' } });
    } else {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'User already exists!',
      });
    }
  }

  // Método para obtener las clases CSS basadas en el tipo de notificación
  getNotificationClasses(notification: Notification): string {
    return `notification ${notification.type}`;
  }
}
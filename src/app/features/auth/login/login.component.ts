import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { NotificationService, Notification } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  
  // Define the notifications property
  notifications: Notification[] = [];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications(); // Get existing notifications

    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.notificationService.addNotification({
          type: 'success',
          position: 'top',
          text: params['message']
        });
      }
    });
  }

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Please complete all fields.'
      });
      return;
    }
  
    const error = this.authService.login(this.username, this.password, this.rememberMe);
    if (error) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: error
      });
    } else {
      this.notificationService.clearNotifications();
      this.router.navigate(['/home']);
    }
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Define the method to get classes based on notification type
  getNotificationClasses(notification: Notification): string {
    return `notification ${notification.type}`;
  }
}
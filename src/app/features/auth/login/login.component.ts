import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

import { NotificationService } from '../../../core/services/notification.service';
import { NotificationsComponent } from "../../notification/notification.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule, NotificationsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.notificationService.addNotification(params['message']);
      }
    });
  }

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      this.notificationService.addNotification('Please complete all fields.');
      return;
    }

    const error = this.authService.login(this.username, this.password, this.rememberMe);
    if (error) {
      this.notificationService.addNotification(error);
    } else {
      this.notificationService.clearNotifications();
      this.router.navigate(['/home']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref, Router, ActivatedRoute } from '@angular/router';

import { NotificationComponent } from '../../notification/notification.component';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService, Notification } from '../../../core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLinkWithHref, FormsModule, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  notifications$: Observable<Notification[]>;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.notifications$ = this.notificationService.getNotifications(); // Obtener las notificaciones
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.notificationService.addNotification({
          type: 'success',
          position: 'top',
          text: params['message'],
        });
      }
    });
  }

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: 'Please complete all fields.',
      });
      return;
    }

    const error = this.authService.login(this.username, this.password, this.rememberMe);
    if (error) {
      this.notificationService.addNotification({
        type: 'error',
        position: 'top',
        text: error,
      });
    } else {
      this.notificationService.clearNotifications(); // Opcional: limpiar notificaciones antes de navegar
      this.router.navigate(['/home']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getNotificationClasses(notification: Notification): string {
    return `notification ${notification.type}`;
  }
}

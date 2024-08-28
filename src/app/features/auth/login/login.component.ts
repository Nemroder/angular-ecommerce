import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NotificationComponent } from '../../notification/notification.component';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService, Notification } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLinkWithHref, FormsModule, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export default class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  notifications$: Observable<Notification[]>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.notifications$ = this.notificationService.getNotifications(); // Obtener las notificaciones
  }

  ngOnInit() {
    // Limpiar notificaciones previas al cargar el componente
    this.notificationService.clearNotifications();
  }

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      this.notificationService.addNotification({
        type: 'error',
        text: 'Please complete all fields.',
      });
      return;
    }

    const error = this.authService.login(this.username, this.password, this.rememberMe);
    if (error) {
      this.notificationService.addNotification({
        type: 'error',
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
}
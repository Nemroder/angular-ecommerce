import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService} from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

import { NotificationComponent } from '../../notification/notification.component';
import { NotificationService, Notification } from '../../../core/services/notification.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule, NotificationComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;

  notifications$: Observable<Notification[]>;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.notifications$ = this.notificationService.getNotifications(); // Obtener las notificaciones
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
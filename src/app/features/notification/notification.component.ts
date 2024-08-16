// notification.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService, Notification } from '../../core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
})
export class NotificationComponent implements OnInit {
  notifications$: Observable<Notification[]>;

  constructor(
    private notificationService: NotificationService
  ) {
    this.notifications$ = this.notificationService.getNotifications(); // Obtener las notificaciones
  }
  
  ngOnInit() {
    this.notifications$ = this.notificationService.getNotifications();
  }

  getNotificationClasses(notification: Notification) {
    return {
      'notification-success': notification.type === 'success',
      'notification-error': notification.type === 'error',
      'notification-info': notification.type === 'info',
      'notification-top': notification.position === 'top',
      'notification-bottom': notification.position === 'bottom',
      'notification-left': notification.position === 'left',
      'notification-right': notification.position === 'right',
    };
  }
}

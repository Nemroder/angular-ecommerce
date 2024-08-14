import { Injectable } from '@angular/core';

export interface Notification {
  type: string;
  position: string; 
  text: string; 
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [];

  getNotifications(): Notification[] {
    return this.notifications;
  }

  addNotification(notification: Notification) {
    this.notifications.push(notification);
  }

  clearNotifications() {
    this.notifications = [];
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  type: string;
  position: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
  notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  constructor() {}

  addNotification(notification: Notification, duration: number = 3000): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = [...currentNotifications, notification];
    this.notificationsSubject.next(updatedNotifications);

    // Remover la notificación después de un tiempo
    setTimeout(() => {
      this.removeNotification(notification);
    }, duration);
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications$;
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }

  private removeNotification(notificationToRemove: Notification): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(notification => notification !== notificationToRemove);
    this.notificationsSubject.next(updatedNotifications);
  }
}
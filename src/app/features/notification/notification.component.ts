import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let message of notifications" class="mt-4 alert alert-info">
      {{ message }}
    </div>
  `,
  styleUrls: ['./notification.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
  }
}
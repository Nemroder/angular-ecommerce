import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Output() deleteUser = new EventEmitter<string>();
  @Output() editUser = new EventEmitter<User>();

  onDeleteUser(username: string): void {
      this.deleteUser.emit(username);
  }

  onEditUser(user: User): void {
      this.editUser.emit(user);
  }
}
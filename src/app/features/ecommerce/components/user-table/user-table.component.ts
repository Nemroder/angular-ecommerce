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
  @Output() assignAgent = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number>();

  currentUserRole: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const loggedUser = this.userService.getLoggedUser();
    this.currentUserRole = loggedUser ? loggedUser.role : null;
  }

  onAssignAgent(userId: number) {
    this.assignAgent.emit(userId);
  }

  onEditUser(user: User): void {
    this.editUser.emit(user);
  }
  
  onDeleteUser(id: number): void {
      this.deleteUser.emit(id);
  }
}
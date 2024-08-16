import { Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, NavbarComponent, UserTableComponent, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users: User[] = [];
  currentUser: User | null = null;

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  handleDeleteUser(username: string): void {
    this.users = this.users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  handleEditUser(user: User): void {
    this.currentUser = { ...user };  // Clonamos el usuario para editarlo
  }

  saveUser(): void {
    if (this.currentUser) {
      this.userService.updateUser(this.currentUser);
      this.loadUsers(); // Recargamos los usuarios después de la actualización
      this.currentUser = null; // Reseteamos el formulario
    }
  }

  cancelEdit(): void {
    this.currentUser = null; // Cancelamos la edición
  }
}
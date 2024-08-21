import { Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { User } from '../../../../core/models/user.model';

import { UserService } from '../../../../core/services/user.service';
import { NotificationService } from '../../../../core/services/notification.service';

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
  showConfirmModal = false;
  showDeleteConfirmModal = false;
  userIdToDelete: number | null = null; // Variable para almacenar el ID del usuario a eliminar

  constructor(
    private userService: UserService, 
    private notificationService: NotificationService
  ) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  handleDeleteUser(id: number): void {
    this.userIdToDelete = id; // Establecemos el ID del usuario a eliminar
    this.openDeleteConfirmModal(); // Abrimos el modal de confirmación
  }

  handleEditUser(user: User): void {
    this.currentUser = { ...user };  // Clonamos el usuario para editarlo
  }

  saveUser(): void {
    if (this.currentUser) {
      this.userService.updateUser(this.currentUser);
      this.loadUsers(); // Recargamos los usuarios después de la actualización
      this.currentUser = null; // Reseteamos el formulario
      this.closeConfirmModal(); // Cierra el modal
    }
  }

  cancelEdit(): void {
    this.currentUser = null; // Cancelamos la edición
  }

  openConfirmModal(): void {
    this.showConfirmModal = true;
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
  }

  confirmSave(): void {
    this.openConfirmModal(); // Abre el modal para confirmar los cambios
  }

  // ELIMINAR

  openDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = true;
  }
  
  closeDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
  }
  
  confirmDelete(): void {
    if (this.userIdToDelete !== null) {
      this.handleDeleteUser(this.userIdToDelete);
      this.userIdToDelete = null;
      this.closeDeleteConfirmModal();
    }
  }

}
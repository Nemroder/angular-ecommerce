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
  showEditConfirmModal = false;
  showDeleteConfirmModal = false;
  userIdToDelete: number | null = null;

  constructor(
    private userService: UserService, 
    private notificationService: NotificationService
  ) {
    this.loadUsers();
  }

   // Cargar usuarios desde el servicio
  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  editForm(user: User): void {
    this.currentUser = { ...user };
  }

  confirmSave(): void {
    if (this.currentUser) {
      this.userService.updateUser(this.currentUser);
      this.loadUsers();  // Recargamos la lista de usuarios
      this.closeEditForm();  // Reseteamos el formulario después de guardar
    }
  }

  closeEditForm(): void {
    this.currentUser = null;  // Limpiamos el formulario
    this.closeEditConfirmModal();
  }

  // Modales de edicion
  openEditConfirmModal(): void {
    this.showEditConfirmModal = true;
  }

  closeEditConfirmModal(): void {
    this.showEditConfirmModal = false;
  }


  // ELIMINACION DE USUARIO
  deleteModal(id: number): void {
    this.userIdToDelete = id;  // Establecemos el ID del usuario a eliminar
    this.openDeleteConfirmModal();  // Abrimos el modal de confirmación de eliminación
  }

  openDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = true;
  }

  closeDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
  }

  confirmDelete(): void {
    if (this.userIdToDelete !== null) {
      this.userService.deleteUser(this.userIdToDelete);  // Elimina el usuario a través del servicio
      this.loadUsers();  // Recarga la lista de usuarios después de la eliminación
      this.resetDeleteState();  // Resetea el estado después de eliminar
    }
  }

  resetDeleteState(): void {
    this.userIdToDelete = null;  // Resetea el ID del usuario a eliminar
    this.closeDeleteConfirmModal();  // Cierra el modal de confirmación de eliminación
  }
}
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {
    this.loadInitialUsers();
  }

  private loadInitialUsers() {
    if (!localStorage.getItem('users')) {
      const initialUsers: User[] = [
        { username: 'admin', password: 'admin', role: 'admin', isActive: true },
        { username: 'supervisor', password: 'supervisor', role: 'supervisor', isActive: true },
        { username: 'agent', password: 'agent', role: 'agente', isActive: true },
        { username: 'client', password: 'client', role: 'cliente', isActive: true }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }  

  addUser(user: User): boolean {
    const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some(existingUser => existingUser.username === user.username);

    if (userExists) {
      return false;
    }

    storedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    return true;
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  updateUser(updatedUser: User): void {
    const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = storedUsers.findIndex(user => user.username === updatedUser.username);

    if (userIndex !== -1) {
      storedUsers[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }
  }
}

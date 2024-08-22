import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private nextId = 1;

  constructor() {
    this.loadInitialUsers();
  }

  private loadInitialUsers() {
    if (!localStorage.getItem('users')) {
      const initialUsers: User[] = [
        { id: this.nextId++, username: 'admin', password: 'admin', role: 'admin', isActive: true },
        { id: this.nextId++, username: 'supervisor', password: 'supervisor', role: 'supervisor', isActive: true },
        { id: this.nextId++, username: 'agent', password: 'agent', role: 'agente', isActive: true },
        { id: this.nextId++, username: 'client', password: 'client', role: 'cliente', isActive: true }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
      this.nextId = initialUsers.length + 1;
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      this.nextId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    }
  }  

  addUser(user: User): boolean {
    const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some(existingUser => existingUser.username === user.username);

    if (userExists) {
      return false;
    }

    user.id = this.nextId++;
    storedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    return true;
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  updateUser(updatedUser: User): void {
    const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = storedUsers.findIndex(user => user.id === updatedUser.id);

    if (userIndex !== -1) {
      storedUsers[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }
  }

  deleteUser(id: number): void {
    let storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    storedUsers = storedUsers.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(storedUsers));
  }
  
  // ASIGNACION DE SUPERVISOR
  assignAgent(agentId: number, supervisorId: number): void {
    const users: User[] = this.getUsers();
    const agent = users.find(user => user.id === agentId);
    if (agent) {
      agent.supervisorId = supervisorId;
      this.updateUser(agent);
    }
  }

  unassignAgent(agentId: number): void {
    const users: User[] = this.getUsers();
    const agent = users.find(user => user.id === agentId);
    if (agent) {
      agent.supervisorId = undefined;
      this.updateUser(agent);
    }
  }

  getLoggedUser(): User | null {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }
}

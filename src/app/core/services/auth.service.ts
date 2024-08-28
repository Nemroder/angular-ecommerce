import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = false;

  constructor(private router: Router, private userService: UserService) {}

  login(username: string, password: string, rememberMe: boolean): string | null {
    const storedUsers = this.userService.getUsers();
    const user = storedUsers.find((user: User) => user.username === username && user.password === password);
  
    if (user) {
      if (!user.isActive) {
        return 'Este usuario está bloqueado.';
      }
  
      localStorage.setItem('loggedUser', JSON.stringify(user));
  
      if (rememberMe) {
        localStorage.setItem('rememberMe', JSON.stringify(true));
      } else {
        localStorage.removeItem('rememberMe');
      }
  
      this.authStatus = true;
  
      // Redirigir a la página principal
      this.router.navigate(['/home']).then(() => {
      }).catch(error => {
        console.error('Error en la redirección:', error);
      });
  
      return null;
    } else {
      return 'Credenciales inválidas.';
    }
  }  

  logout() {
    localStorage.removeItem('loggedUser');
    this.authStatus = false;
    this.router.navigate(['/login']);
  }

  getLoggedUser(): User | null {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return this.authStatus;
  }

  isSupervisor(): boolean {
    const user = this.getLoggedUser();
    return user ? user.role === 'supervisor' : false;
  }

  isClient(): boolean {
    const user = this.getLoggedUser();
    return user ? user.role === 'cliente' : false;
  }
  isAdmin(): boolean {
    const user = this.getLoggedUser();
    return user ? user.role === 'admin' : false;
  }
}

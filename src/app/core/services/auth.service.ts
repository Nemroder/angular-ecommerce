import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService) {}

  login(username: string, password: string): Observable<User> {
    return this.userService.getUsers().pipe(
      map((users: User[]) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user && user.isActive) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          return user;
        } else {
          throw new Error('Invalid credentials or user is blocked.');
        }
      }),
      catchError(err => {
        return throwError(() => new Error(err.message));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

  getLoggedInUser(): User | null {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USERS_KEY = 'users';

  getUsers(): Observable<User[]> {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    return of(users);
  }

  addUser(newUser: User): Observable<void> {
    return this.getUsers().pipe(
      map((users: User[]) => {
        users.push(newUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      })
    );
  }

  initializeUsers(users: User[]): void {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
  }
}
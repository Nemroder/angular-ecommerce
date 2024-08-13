import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.username || this.username.trim() === '') {
      this.errorMessage = 'Username cannot be empty!';
      return;
    }
    if (!this.password || this.password.trim() === '') {
      this.errorMessage = 'Password cannot be empty!';
      return;
    }
    if (!this.confirmPassword || this.confirmPassword.trim() === '') {
      this.errorMessage = 'Confirm Password cannot be empty!';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    const newUser: User = {
      username: this.username,
      password: this.password,
      role: 'cliente',
      isActive: true
    };

    if (this.userService.addUser(newUser)) {
      this.router.navigate(['/login'], { queryParams: { message: 'User has been created successfully!' } });
    } else {
      this.errorMessage = 'User already exists!';
    }
  }


  users: User[] = [];

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}

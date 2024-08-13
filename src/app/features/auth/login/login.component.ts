import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.successMessage = params['message'];
      }
    });
  }
  
  login() {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Please complete all fields.';
      this.successMessage = '';
      return;
    }
  
    const error = this.authService.login(this.username, this.password, this.rememberMe);
    if (error) {
      this.errorMessage = error;
      this.successMessage = '';
    } else {
      this.errorMessage = '';
      // Verificar si el redireccionamiento es necesario aquí o puede manejarse en el servicio
    }
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

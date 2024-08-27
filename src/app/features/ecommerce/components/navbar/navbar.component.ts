import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

import { CartComponent } from '../cart/cart.component';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, CartComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showUserMenu = false;

  constructor(public authService: AuthService) {}

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.authService.logout(); // Llama al método de logout del AuthService
  }
}
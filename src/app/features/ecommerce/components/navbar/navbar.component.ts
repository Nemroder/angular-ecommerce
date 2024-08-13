import { Component, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/models/product.model';
import { RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input({required: true}) cart: Product[] = [];
  
  hideSideMenu = signal(true);
  total = signal(0);
  showUserMenu = false;
  constructor(private authService: AuthService) {}


  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  ngOnChanges(changes: SimpleChanges) {
    const cart = changes['cart'];
    if (cart) {
      this.total.set(this.calcTotal());
    }
  }

  calcTotal() {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }

  logout() {
    this.authService.logout(); // Llama al método de logout del AuthService
  }
}
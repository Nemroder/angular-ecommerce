import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Product[] = [];
  total: number = 0;
  hideSideMenu = true;

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.total = this.calculateTotal();
    });
  }

  toggleSideMenu(): void {
    this.hideSideMenu = !this.hideSideMenu;
  }

  getTotalQuantity(): number {
    return this.cart.reduce((total, product) => total + (product.quantity || 1), 0);
  }  

  calculateTotal(): number {
    return this.cart.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  deleteProduct(productId: number): void {
    this.cartService.deleteProduct(productId);
  }
}

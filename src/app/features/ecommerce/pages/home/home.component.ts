import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { Product } from '../../../../core/models/product.model';

import { CartService } from '../../../../core/services/cart.service';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] = [];
  cart: Product[] = [];

  constructor(
    private productService: ProductService, 
    private cartService: CartService) {
    }

  ngOnInit() {
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
    });

    this.productService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
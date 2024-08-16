import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  private loadCart(): Product[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCart(cart: Product[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: Product): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = [...currentCart, product];
    this.cartSubject.next(updatedCart);
    this.saveCart(updatedCart);
  }

  getCart(): Product[] {
    return this.cartSubject.value;
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCart([]);
  }
}
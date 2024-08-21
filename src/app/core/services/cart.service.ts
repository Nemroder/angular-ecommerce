import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

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
    let currentCart = this.cartSubject.value;

    // Check if product already exists in the cart
    const existingProduct = currentCart.find(item => item.id === product.id);

    if (existingProduct) {
      // Increase the quantity of the existing product
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      // Add new product with quantity 1
      currentCart = [...currentCart, { ...product, quantity: 1 }];
    }

    this.cartSubject.next(currentCart);
    this.saveCart(currentCart);
  }

  increaseQuantity(productId: number): void {
    const currentCart = this.cartSubject.value;
    const index = currentCart.findIndex(p => p.id === productId);
    if (index !== -1) {
      currentCart[index].quantity = (currentCart[index].quantity || 1) + 1;
      this.cartSubject.next(currentCart);
      this.saveCart(currentCart);
    }
  }

  decreaseQuantity(productId: number): void {
    const currentCart = this.cartSubject.value;
    const index = currentCart.findIndex(p => p.id === productId);
    if (index !== -1) {
      if (currentCart[index].quantity && currentCart[index].quantity > 1) {
        currentCart[index].quantity -= 1;
      } else {
        // Eliminar producto si la cantidad llega a 0
        currentCart.splice(index, 1);
      }
      this.cartSubject.next(currentCart);
      this.saveCart(currentCart);
    }
  }

  getCart(): Product[] {
    return this.cartSubject.value;
  }

  clearCart(): void {
    this.cartSubject.next([]);
    this.saveCart([]);
  }

  deleteProduct(productId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(product => product.id !== productId);
    this.cartSubject.next(updatedCart);
    this.saveCart(updatedCart);
  }
}
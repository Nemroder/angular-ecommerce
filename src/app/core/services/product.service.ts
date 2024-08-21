// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private nextId = 1;

    private productsSubject = new BehaviorSubject<Product[]>([]);
    products$ = this.productsSubject.asObservable();
  
    private cartSubject = new BehaviorSubject<Product[]>([]);
    cart$ = this.cartSubject.asObservable();

  constructor() {
    const initProducts: Product[] = [
      { id: this.nextId++, title: 'Pro 1', price: 100, image: 'https://picsum.photos/640/640?r=23', creationAt: new Date().toISOString() },
      { id: this.nextId++, title: 'Pro 2', price: 100, image: 'https://picsum.photos/640/640?r=12', creationAt: new Date().toISOString() },
    ];
    this.productsSubject.next(initProducts);
  }

  addProduct(product: Product) {
    const currentProducts = this.productsSubject.value;
    this.productsSubject.next([...currentProducts, product]);
  }
  addToCart(product: Product) {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next([...currentCart, product]);
  }
    // constructor() {
  //   const initProducts = [
  //     {
  //       id: Date.now(),
  //       title: 'Pro 1',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=23',
  //       creationAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Pro 2',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=12',
  //       creationAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Pro 3',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=1212',
  //       creationAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Pro 1',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=233',
  //       creationAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Pro 2',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=121',
  //       creationAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Pro 3',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=11',
  //       creationAt: new Date().toISOString()
  //     }
  //   ];
  //   this.products.set(initProducts);
  //   console.log ('Funciona');

  // }
}
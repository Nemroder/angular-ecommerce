import { Component, signal } from '@angular/core';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Product } from '../../../../shared/models/product.model';
import { ProductListComponent } from '../../components/product-list/product-list.component';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProductDetailComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products = signal<Product[]>([]);  
  cart = signal<Product[]>([]);  

  constructor() {
    const initProducts = [
      {
        id: Date.now(),
        title: 'Pro 1',
        price: 100,
        image: 'https://picsum.photos/640/640?r=23',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 2',
        price: 100,
        image: 'https://picsum.photos/640/640?r=12',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 3',
        price: 100,
        image: 'https://picsum.photos/640/640?r=1212',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 1',
        price: 100,
        image: 'https://picsum.photos/640/640?r=233',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 2',
        price: 100,
        image: 'https://picsum.photos/640/640?r=121',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 3',
        price: 100,
        image: 'https://picsum.photos/640/640?r=11',
        creationAt: new Date().toISOString()
      }
    ];
    this.products.set(initProducts);
    console.log ('Funciona');

  }

  addtoCart(product: Product) {
    this.cart.update(prevState => [...prevState, product]);
    console.log ('Añadido');

  }
}
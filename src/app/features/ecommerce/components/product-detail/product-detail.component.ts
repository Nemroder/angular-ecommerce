import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../../../../shared/models/product.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductListComponent, NavbarComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
 
}

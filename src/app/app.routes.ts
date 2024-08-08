import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { NavbarComponent } from './features/ecommerce/components/navbar/navbar.component';
import { HomeComponent } from './features/ecommerce/pages/home/home.component';
import { ProductDetailComponent } from './features/ecommerce/components/product-detail/product-detail.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'navbar',
        component: NavbarComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'product-detail',
        component: ProductDetailComponent
    }
]

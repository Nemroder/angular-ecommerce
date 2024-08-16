import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { NavbarComponent } from './features/ecommerce/components/navbar/navbar.component';
import { HomeComponent } from './features/ecommerce/pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserComponent } from './features/ecommerce/pages/user/user.component';


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
    {   path: 'home',
        component: HomeComponent, 
        // canActivate: [AuthGuard, RoleGuard], 
        // data: { role: 'admin' }
    },
    {   path: 'user',
        component: UserComponent, 
        // canActivate: [AuthGuard, RoleGuard], 
        // data: { role: 'admin' }
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
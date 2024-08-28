import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';



export const routes: Routes = [
    {
        path: 'login',
        loadComponent:() => import('./features/auth/login/login.component')
    },
    {
        path: 'sign-up',
        loadComponent:() => import('./features/auth/sign-up/sign-up.component')
    },
    {   path: 'home',
        loadComponent:() => import('./features/ecommerce/pages/home/home.component'),
        canActivate: [AuthGuard], 
    },
    {   path: 'users',
        loadComponent:() => import('./features/ecommerce/pages/user/user.component'),
        // canActivate: [AuthGuard], 
        // data: { role: 'admin' }
    },
    {
        path: 'team',
        loadComponent:() => import('./features/ecommerce/pages/team/team.component'),
        canActivate: [AuthGuard], 
    },
    {
        path: 'needs',
        loadComponent:() => import('./features/ecommerce/pages/need-list/need-list.component'),
        canActivate: [AuthGuard], 
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
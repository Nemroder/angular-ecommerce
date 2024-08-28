import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { NavbarComponent } from './features/ecommerce/components/navbar/navbar.component';
import { HomeComponent } from './features/ecommerce/pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserComponent } from './features/ecommerce/pages/user/user.component';
import { TeamComponent } from './features/ecommerce/pages/team/team.component';
import { NeedListComponent } from './features/ecommerce/pages/need-list/need-list.component';


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
        // canActivate: [AuthGuard], 
    },
    {   path: 'users',
        component: UserComponent, 
        // canActivate: [AuthGuard, RoleGuard], 
        // data: { role: 'admin' }
    },
    {
        path: 'team',
        component: TeamComponent, 
        // canActivate: [AuthGuard], 
    },
    {
        path: 'needs',
        component: NeedListComponent, 
        // canActivate: [AuthGuard], 
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
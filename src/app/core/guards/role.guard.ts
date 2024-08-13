import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['role']; // Asegúrate de que la clave es correcta
    const user = this.authService.getLoggedUser();

    if (!user || user.role !== expectedRole) {
      // Si user es null o no tiene el rol esperado, redirige
      this.router.navigate(['/navbar']);
      return false;
    }

    return true;
  }
}
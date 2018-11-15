import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  private isAuthenticated = false; // Set this value dynamically

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //if (this.isAuthenticated) {
    if (localStorage.getItem('authToken')) {
      return true
    }
    this.router.navigate(['/sesiones/signin']);
    return false;
  }

}

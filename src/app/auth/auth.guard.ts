import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isTokenPresents.pipe(
      take(1),
      tap(isTokenPresents => {
        console.log(isTokenPresents);
        const isLoginRout = this.router.url === '/login';
        // todo: finish
        if (isTokenPresents) {
          return true;
        } else {
          return this.router.navigate(['/login']);
        }
      })
    );
  }
}

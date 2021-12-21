import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuthenticationService } from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const user = await this.firebaseAuthenticationService.getCurrentUser();
    if (user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

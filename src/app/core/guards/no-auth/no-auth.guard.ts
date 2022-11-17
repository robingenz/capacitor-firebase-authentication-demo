import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuthenticationService } from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const user = await this.firebaseAuthenticationService.getCurrentUser();
    if (user) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

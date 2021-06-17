import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, FirebaseAuthenticationService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly dialogService: DialogService,
    private readonly router: Router
  ) {}

  public async signOut(): Promise<void> {
    const loadingElement = await this.dialogService.showLoading();
    try {
      await this.firebaseAuthenticationService.signOut();
      await this.navigateToLogin();
    } finally {
      await loadingElement.dismiss();
    }
  }

  private async navigateToLogin(): Promise<void> {
    await this.router.navigate(['/login'], { replaceUrl: true });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, FirebaseAuthenticationService } from '@app/core';
import { User } from '@capacitor-firebase/authentication';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public currentUser: User | null = null;
  public idToken = '';
  public languageCode = '';

  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly dialogService: DialogService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.firebaseAuthenticationService.getCurrentUser().then((user) => {
      this.currentUser = user;
    });
    this.firebaseAuthenticationService.getIdToken().then((idToken) => {
      this.idToken = idToken;
    });
  }

  public async signOut(): Promise<void> {
    const loadingElement = await this.dialogService.showLoading();
    try {
      await this.firebaseAuthenticationService.signOut();
      await this.navigateToLoginPage();
    } finally {
      await loadingElement.dismiss();
    }
  }

  public async refreshIdToken(): Promise<void> {
    const loadingElement = await this.dialogService.showLoading();
    try {
      this.idToken = await this.firebaseAuthenticationService.getIdToken({
        forceRefresh: true,
      });
    } finally {
      await loadingElement.dismiss();
    }
  }

  public async refreshCurrentUser(): Promise<void> {
    const loadingElement = await this.dialogService.showLoading();
    try {
      this.currentUser =
        await this.firebaseAuthenticationService.getCurrentUser();
    } finally {
      await loadingElement.dismiss();
    }
  }

  public async setLanguageCode(languageCode: string): Promise<void> {
    await this.firebaseAuthenticationService.setLanguageCode(languageCode);
  }

  public async useAppLanguage(): Promise<void> {
    await this.firebaseAuthenticationService.useAppLanguage();
  }

  private async navigateToLoginPage(): Promise<void> {
    await this.router.navigate(['/login'], { replaceUrl: true });
  }
}

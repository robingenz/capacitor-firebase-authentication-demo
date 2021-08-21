import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, FirebaseAuthenticationService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly dialogService: DialogService,
    private readonly router: Router
  ) {}

  public async signInWithApple(): Promise<void> {
    await this.signInWith(SignInProvider.apple);
  }

  public async signInWithFacebook(): Promise<void> {
    await this.signInWith(SignInProvider.facebook);
  }

  public async signInWithGithub(): Promise<void> {
    await this.signInWith(SignInProvider.github);
  }

  public async signInWithGoogle(): Promise<void> {
    await this.signInWith(SignInProvider.google);
  }

  public async signInWithMicrosoft(): Promise<void> {
    await this.signInWith(SignInProvider.microsoft);
  }

  public async signInWithTwitter(): Promise<void> {
    await this.signInWith(SignInProvider.twitter);
  }

  public async signInWithYahoo(): Promise<void> {
    await this.signInWith(SignInProvider.yahoo);
  }

  private async signInWith(signInProvider: SignInProvider): Promise<void> {
    const loadingElement = await this.dialogService.showLoading();
    try {
      switch (signInProvider) {
        case SignInProvider.apple:
          await this.firebaseAuthenticationService.signInWithApple();
          break;
        case SignInProvider.facebook:
          await this.firebaseAuthenticationService.signInWithFacebook();
          break;
        case SignInProvider.github:
          await this.firebaseAuthenticationService.signInWithGithub();
          break;
        case SignInProvider.google:
          await this.firebaseAuthenticationService.signInWithGoogle();
          break;
        case SignInProvider.microsoft:
          await this.firebaseAuthenticationService.signInWithMicrosoft();
          break;
        case SignInProvider.twitter:
          await this.firebaseAuthenticationService.signInWithTwitter();
          break;
        case SignInProvider.yahoo:
          await this.firebaseAuthenticationService.signInWithYahoo();
          break;
      }
      await this.navigateToHome();
    } catch (error) {
      await this.dialogService.showErrorAlert({ message: error });
    } finally {
      await loadingElement.dismiss();
    }
  }

  private async navigateToHome(): Promise<void> {
    await this.router.navigate(['/home'], { replaceUrl: true });
  }
}

enum SignInProvider {
  apple = 'apple',
  facebook = 'facebook',
  github = 'github',
  google = 'google',
  microsoft = 'microsoft',
  twitter = 'twitter',
  yahoo = 'yahoo',
}

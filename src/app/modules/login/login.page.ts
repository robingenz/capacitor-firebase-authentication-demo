import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, FirebaseAuthenticationService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly dialogService: DialogService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.firebaseAuthenticationService.getRedirectResult().then((result) => {
      if (result?.user) {
        this.navigateToHome();
      }
    });
    this.firebaseAuthenticationService.phoneVerificationCompleted$.subscribe(
      () => this.navigateToHome()
    );
    this.firebaseAuthenticationService.phoneCodeSent$.subscribe(
      async (event) => {
        const verificationCode = await this.showInputVerificationCodeAlert();
        if (!verificationCode) {
          return;
        }
        let loadingElement: HTMLIonLoadingElement | undefined;
        try {
          loadingElement = await this.dialogService.showLoading();
          await this.firebaseAuthenticationService.confirmVerificationCode({
            verificationCode,
            verificationId: event.verificationId,
          });
          await this.navigateToHome();
        } finally {
          await loadingElement?.dismiss();
        }
      }
    );
  }

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

  public async signInWithPlayGames(): Promise<void> {
    await this.signInWith(SignInProvider.playgames);
  }

  public async signInWithTwitter(): Promise<void> {
    await this.signInWith(SignInProvider.twitter);
  }

  public async signInWithYahoo(): Promise<void> {
    await this.signInWith(SignInProvider.yahoo);
  }

  public async signInWithPhoneNumber(): Promise<void> {
    let loadingElement: HTMLIonLoadingElement | undefined;
    try {
      const phoneNumber = await this.showInputPhoneNumberAlert();
      if (!phoneNumber) {
        return;
      }
      loadingElement = await this.dialogService.showLoading();
      await this.firebaseAuthenticationService.signInWithPhoneNumber({
        phoneNumber,
      });
      await loadingElement.dismiss();
    } finally {
      await loadingElement?.dismiss();
    }
  }

  private async signInWith(provider: SignInProvider): Promise<void> {
    const loadingElement = await this.dialogService.showLoading();
    try {
      switch (provider) {
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
        case SignInProvider.playgames:
          await this.firebaseAuthenticationService.signInWithPlayGames();
          break;
        case SignInProvider.twitter:
          await this.firebaseAuthenticationService.signInWithTwitter();
          break;
        case SignInProvider.yahoo:
          await this.firebaseAuthenticationService.signInWithYahoo();
          break;
      }
      await this.navigateToHome();
    } finally {
      await loadingElement.dismiss();
    }
  }

  private async navigateToHome(): Promise<void> {
    await this.router.navigate(['/home'], { replaceUrl: true });
  }

  private async showInputPhoneNumberAlert(): Promise<string | undefined> {
    const data = await this.dialogService.showInputAlert({
      inputs: [
        {
          name: 'phoneNumber',
          type: 'text',
          placeholder: 'Phone Number',
        },
      ],
    });
    if (!data) {
      return;
    }
    return data.phoneNumber;
  }

  private async showInputVerificationCodeAlert(): Promise<string | undefined> {
    const data = await this.dialogService.showInputAlert({
      inputs: [
        {
          name: 'verificationCode',
          type: 'text',
          placeholder: 'Verification Code',
        },
      ],
    });
    if (!data) {
      return;
    }
    return data.verificationCode;
  }
}

enum SignInProvider {
  apple = 'apple',
  facebook = 'facebook',
  github = 'github',
  google = 'google',
  microsoft = 'microsoft',
  playgames = 'playgames',
  twitter = 'twitter',
  yahoo = 'yahoo',
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, FirebaseAuthenticationService } from '@app/core';
import { combineLatest, startWith, takeUntil, tap } from 'rxjs';

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
    void this.firebaseAuthenticationService.checkRedirectResult();
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
    const phoneNumber = await this.showInputPhoneNumberAlert();
    if (!phoneNumber) {
      return;
    }
    loadingElement = await this.dialogService.showLoading();
    combineLatest([
      this.firebaseAuthenticationService.phoneVerificationId$,
      this.firebaseAuthenticationService.phoneVerificationCode$.pipe(
        startWith(undefined)
      ),
    ])
      .pipe(
        takeUntil(
          this.firebaseAuthenticationService.phoneVerificationErrorMessage$.pipe(
            tap(() => {
              void loadingElement?.dismiss();
            })
          )
        )
      )
      .subscribe(async ([verificationId, verificationCode]) => {
        await loadingElement?.dismiss();
        loadingElement = undefined;
        if (verificationCode) {
          await this.dialogService.dismissAlert().catch();
        } else {
          verificationCode = await this.showInputVerificationCodeAlert();
          if (!verificationCode) {
            return;
          }
        }
        loadingElement = await this.dialogService.showLoading();
        await this.firebaseAuthenticationService.signInWithPhoneNumber({
          verificationId,
          verificationCode,
        });
        await loadingElement.dismiss();
        await this.navigateToHome();
      });
    void this.firebaseAuthenticationService.signInWithPhoneNumber({
      phoneNumber,
    });
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

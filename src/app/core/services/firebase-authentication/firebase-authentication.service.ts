import { Injectable, NgZone } from '@angular/core';
import {
  AuthStateChange,
  FirebaseAuthentication,
  GetIdTokenOptions,
  SignInWithPhoneNumberOptions,
  SignInWithPhoneNumberResult,
  User,
} from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import { environment } from '@env/environment';
import { Platform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { lastValueFrom, Observable, ReplaySubject, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  private currentUserSubject = new ReplaySubject<User | null>(1);
  private phoneVerificationCodeSubject = new Subject<string>();
  private phoneVerificationErrorMessageSubject = new Subject<string>();
  private phoneVerificationIdSubject = new Subject<string>();

  constructor(
    private readonly platform: Platform,
    private readonly ngZone: NgZone
  ) {
    void FirebaseAuthentication.removeAllListeners().then(() => {
      void FirebaseAuthentication.addListener(
        'authStateChange',
        (change: AuthStateChange) => {
          this.ngZone.run(() => {
            this.currentUserSubject.next(change.user);
          });
        }
      );
      void FirebaseAuthentication.addListener(
        'phoneVerificationCompleted',
        (event: { verificationCode: string }) => {
          this.ngZone.run(() => {
            this.phoneVerificationCodeSubject.next(event.verificationCode);
          });
        }
      );
      void FirebaseAuthentication.addListener(
        'phoneVerificationFailed',
        (event: { message: string }) => {
          this.ngZone.run(() => {
            this.phoneVerificationErrorMessageSubject.next(event.message);
          });
        }
      );
      void FirebaseAuthentication.addListener(
        'phoneCodeSent',
        (event: { verificationId: string }) => {
          this.ngZone.run(() => {
            this.phoneVerificationIdSubject.next(event.verificationId);
          });
        }
      );
    });
    // Only needed to support dev livereload.
    void FirebaseAuthentication.getCurrentUser().then(
      (result: AuthStateChange) => {
        this.currentUserSubject.next(result.user);
      }
    );
  }

  public get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  public get phoneVerificationCode$(): Observable<string> {
    return this.phoneVerificationCodeSubject.asObservable();
  }

  public get phoneVerificationErrorMessage$(): Observable<string> {
    return this.phoneVerificationErrorMessageSubject.asObservable();
  }

  public get phoneVerificationId$(): Observable<string> {
    return this.phoneVerificationIdSubject.asObservable();
  }

  public async initialize(): Promise<void> {
    if (this.platform.is('capacitor')) {
      return;
    }
    /**
     * Only needed if the Firebase JavaScript SDK is used.
     *
     * Read more: https://github.com/robingenz/capacitor-firebase/blob/main/packages/authentication/docs/firebase-js-sdk.md
     */
    initializeApp(environment.firebase);
  }

  public async checkRedirectResult(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      return;
    }
    await FirebaseAuthentication.getRedirectResult();
  }

  public getCurrentUser(): Promise<User | null> {
    return lastValueFrom(this.currentUser$.pipe(take(1)));
  }

  public async getIdToken(options?: GetIdTokenOptions): Promise<string> {
    const result = await FirebaseAuthentication.getIdToken(options);
    return result.token;
  }

  public async setLanguageCode(languageCode: string): Promise<void> {
    await FirebaseAuthentication.setLanguageCode({ languageCode });
  }

  public async signInWithApple(): Promise<void> {
    await FirebaseAuthentication.signInWithApple();
  }

  public async signInWithFacebook(): Promise<void> {
    await FirebaseAuthentication.signInWithFacebook();
  }

  public async signInWithGithub(): Promise<void> {
    await FirebaseAuthentication.signInWithGithub();
  }

  public async signInWithGoogle(): Promise<void> {
    await FirebaseAuthentication.signInWithGoogle({
      mode: 'redirect',
    });
  }

  public async signInWithMicrosoft(): Promise<void> {
    await FirebaseAuthentication.signInWithMicrosoft();
  }

  public async signInWithPlayGames(): Promise<void> {
    await FirebaseAuthentication.signInWithPlayGames();
  }

  public async signInWithTwitter(): Promise<void> {
    await FirebaseAuthentication.signInWithTwitter();
  }

  public async signInWithYahoo(): Promise<void> {
    await FirebaseAuthentication.signInWithYahoo();
  }

  public async signInWithPhoneNumber(
    options: SignInWithPhoneNumberOptions
  ): Promise<SignInWithPhoneNumberResult> {
    return FirebaseAuthentication.signInWithPhoneNumber(options);
  }

  public async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }

  public async useAppLanguage(): Promise<void> {
    await FirebaseAuthentication.useAppLanguage();
  }
}

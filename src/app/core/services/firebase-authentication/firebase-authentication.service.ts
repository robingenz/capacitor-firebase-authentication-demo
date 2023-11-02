import { Injectable, NgZone } from '@angular/core';
import {
  ConfirmVerificationCodeOptions,
  FirebaseAuthentication,
  GetIdTokenOptions,
  PhoneVerificationCompletedEvent,
  SignInResult,
  SignInWithPhoneNumberOptions,
  User,
} from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import { environment } from '@env/environment';
import { Platform } from '@ionic/angular';
import { getApp, initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';
import { Observable, ReplaySubject, Subject, lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  private currentUserSubject = new ReplaySubject<User | null>(1);
  private phoneVerificationCompletedSubject =
    new Subject<PhoneVerificationCompletedEvent>();
  private phoneCodeSentSubject = new Subject<{
    verificationId: string;
  }>();

  constructor(
    private readonly platform: Platform,
    private readonly ngZone: NgZone
  ) {
    FirebaseAuthentication.removeAllListeners().then(() => {
      FirebaseAuthentication.addListener('authStateChange', (change) => {
        this.ngZone.run(() => {
          this.currentUserSubject.next(change.user);
        });
      });
      FirebaseAuthentication.addListener(
        'phoneVerificationCompleted',
        async (event) => {
          this.ngZone.run(() => {
            this.phoneVerificationCompletedSubject.next(event);
          });
        }
      );
      FirebaseAuthentication.addListener('phoneCodeSent', async (event) => {
        this.ngZone.run(() => {
          this.phoneCodeSentSubject.next(event);
        });
      });
    });
    // Only needed to support dev livereload.
    FirebaseAuthentication.getCurrentUser().then((result) => {
      this.currentUserSubject.next(result.user);
    });
    const auth = this.getFirebaseAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('Firebase JS SDK auth state changed', { user });
    });
  }

  public get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  public get phoneVerificationCompleted$(): Observable<PhoneVerificationCompletedEvent> {
    return this.phoneVerificationCompletedSubject.asObservable();
  }

  public get phoneCodeSent$(): Observable<{
    verificationId: string;
  }> {
    return this.phoneCodeSentSubject.asObservable();
  }

  public async initialize(): Promise<void> {
    // if (this.platform.is('capacitor')) {
    //   return;
    // }
    /**
     * Only needed if the Firebase JavaScript SDK is used.
     *
     * Read more: https://github.com/robingenz/capacitor-firebase/blob/main/packages/authentication/docs/firebase-js-sdk.md
     */
    // initializeApp(environment.firebase);
  }

  public async getRedirectResult(): Promise<SignInResult | undefined> {
    if (Capacitor.isNativePlatform()) {
      return;
    }
    return FirebaseAuthentication.getRedirectResult();
  }

  public confirmVerificationCode(
    options: ConfirmVerificationCodeOptions
  ): Promise<SignInResult> {
    return FirebaseAuthentication.confirmVerificationCode(options);
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
    // 1. Create credentials on the native layer
    const result = await FirebaseAuthentication.signInWithApple();
    // 2. Sign in on the web layer using the id token and nonce
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({
      idToken: result.credential?.idToken,
      rawNonce: result.credential?.nonce,
    });
    const auth = getAuth();
    await signInWithCredential(auth, credential);
  }

  public async signInWithFacebook(): Promise<void> {
    await FirebaseAuthentication.signInWithFacebook();
  }

  public async signInWithGithub(): Promise<void> {
    await FirebaseAuthentication.signInWithGithub();
  }

  public async signInWithGoogle(): Promise<void> {
    // 1. Create credentials on the native layer
    const result = await FirebaseAuthentication.signInWithGoogle();
    // 2. Sign in on the web layer using the id token
    const credential = GoogleAuthProvider.credential(
      result.credential?.idToken
    );
    const auth = getAuth();
    await signInWithCredential(auth, credential);
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

  public signInWithPhoneNumber(
    options: SignInWithPhoneNumberOptions
  ): Promise<void> {
    return FirebaseAuthentication.signInWithPhoneNumber(options);
  }

  public async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }

  public async useAppLanguage(): Promise<void> {
    await FirebaseAuthentication.useAppLanguage();
  }

  private getFirebaseAuth(): any {
    initializeApp(environment.firebase);
    if (Capacitor.isNativePlatform()) {
      return initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence,
      });
    } else {
      return getAuth();
    }
  }
}

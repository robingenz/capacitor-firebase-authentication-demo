import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Platform } from '@ionic/angular';
import {
  FirebaseAuthentication,
  GetIdTokenOptions,
  SignInWithPhoneNumberOptions,
  SignInWithPhoneNumberResult,
  User,
} from '@robingenz/capacitor-firebase-authentication';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  constructor(private readonly platform: Platform) {}

  public async initialize(): Promise<void> {
    if (this.platform.is('capacitor')) {
      return;
    }
    await FirebaseAuthentication.initialize(environment.firebase);
  }

  public async getCurrentUser(): Promise<User | null> {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user;
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
    await FirebaseAuthentication.signInWithGoogle();
  }

  public async signInWithMicrosoft(): Promise<void> {
    await FirebaseAuthentication.signInWithMicrosoft();
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

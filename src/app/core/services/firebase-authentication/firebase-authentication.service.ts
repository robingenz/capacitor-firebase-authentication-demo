import { Injectable } from '@angular/core';
import {
  FirebaseAuthentication,
  GetIdTokenOptions,
  User,
} from '@robingenz/capacitor-firebase-authentication';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  constructor() {}

  public async signInWithApple(): Promise<void> {
    await FirebaseAuthentication.signInWithApple();
  }

  public async signInWithGoogle(): Promise<void> {
    await FirebaseAuthentication.signInWithGoogle();
  }

  public async signInWithMicrosoft(): Promise<void> {
    await FirebaseAuthentication.signInWithMicrosoft();
  }

  public async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }

  public async getCurrentUser(): Promise<User | null> {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user;
  }

  public async getIdToken(options?: GetIdTokenOptions): Promise<string> {
    const result = await FirebaseAuthentication.getIdToken(options);
    return result.token;
  }
}

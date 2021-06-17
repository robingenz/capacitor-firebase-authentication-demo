import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  constructor() {}

  public async signInWithApple(): Promise<void> {
    throw new Error('Not implemented');
  }

  public async signInWithGoogle(): Promise<void> {
    throw new Error('Not implemented');
  }

  public async signInWithMicrosoft(): Promise<void> {
    throw new Error('Not implemented');
  }

  public async signOut(): Promise<void> {
    throw new Error('Not implemented');
  }

  public async getCurrentUser(): Promise<any> {
    throw new Error('Not implemented');
  }

  public async getIdToken(): Promise<any> {
    throw new Error('Not implemented');
  }
}

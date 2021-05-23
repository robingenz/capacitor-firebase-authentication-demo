import { Injectable } from '@angular/core';
import { Plugins, StoragePlugin } from '@capacitor/core';
import '@robingenz/capacitor-firebase-authentication';
import {
  FirebaseAuthenticationPlugin,
  SignInProvider,
  SignInResult,
} from '@robingenz/capacitor-firebase-authentication';
import { StorageKey } from '../enums';
import { StorageService } from '../services';
// eslint-disable-next-line @typescript-eslint/naming-convention
const FirebaseAuthentication: FirebaseAuthenticationPlugin =
  Plugins.FirebaseAuthentication as FirebaseAuthenticationPlugin;
// eslint-disable-next-line @typescript-eslint/naming-convention
const Storage: StoragePlugin = Plugins.Storage as StoragePlugin;

const LOG_TAG = '[AuthService]';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly storageService: StorageService) {}

  public async signInWithGoogle(): Promise<void> {
    const result = await FirebaseAuthentication.signIn({
      provider: SignInProvider.GOOGLE,
    });
    this.storageService.storeData(StorageKey.session, result);
  }

  public async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
    this.storageService.removeData(StorageKey.session);
  }

  public async isAuthenticated(): Promise<boolean> {
    const session = this.storageService.retrieveData<SignInResult>(StorageKey.session);
    if (session) {
      return true;
    }
    return false;
  }
}

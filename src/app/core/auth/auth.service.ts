import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public async getCurrentUser(): Promise<any> {
    throw new Error('Not implemented');
  }
}

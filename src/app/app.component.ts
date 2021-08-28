import { Component } from '@angular/core';
import { FirebaseAuthenticationService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService
  ) {
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    await this.firebaseAuthenticationService.initialize();
  }
}

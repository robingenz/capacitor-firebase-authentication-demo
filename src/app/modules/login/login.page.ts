import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  public async login(): Promise<void> {
    await this.authService.signInWithGoogle();
    await this.router.navigate(['/home']);
  }
}

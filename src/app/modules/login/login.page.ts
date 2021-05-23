import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
  }

  public async login(): Promise<void> {
    this.authService.signInWithGoogle();
  }
}

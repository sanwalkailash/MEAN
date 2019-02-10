import { Injectable }               from '@angular/core';
import { AuthGuard }                from './auth.guard';

@Injectable()
export class AuthService {

  constructor() { }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  isLoggedIn(): boolean {
    var authenticated = false;
    if (localStorage.getItem("auth_token") !== null)
      authenticated = true;
    return authenticated;
  }
}

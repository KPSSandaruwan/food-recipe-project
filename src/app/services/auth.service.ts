import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  firebase = environment.firebase_api_key;


  constructor(private httpClient: HttpClient, private router: Router) { }

  public signUp(email: string, password: string) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    return this.httpClient
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebase}`, data)
      .pipe(
        tap(resData => {
          const expirationData = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationData);
          this.user.next(user);
          this.autoLogout(+resData.expiresIn * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  public logIn(email: string, password: string) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    return this.httpClient
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebase}`, data)
      .pipe(
        tap(resData => {
          const expirationData = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationData);
          this.user.next(user);
          this.autoLogout(+resData.expiresIn * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  public logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }




  public autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }


}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

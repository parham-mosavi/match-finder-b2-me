import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Member } from '../models/member.model.js';
import { AppUser } from '../models/app-user.model.js';
import { LoggedInUser } from '../models/logged-in-model.js';
import { Login } from '../models/login.model.js';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { platformBrowser } from '@angular/platform-browser';
import { environment } from '../../environments/environment.development.js';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  http = inject(HttpClient);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);
  loggedInUserSig = signal<LoggedInUser | null>(null);

  private readonly _baseApiUrl: string = environment.baseApiUrl + 'api/';

  register(userInput: AppUser): Observable<LoggedInUser | null> {
    let response$: Observable<LoggedInUser | null> =
      this.http.post<LoggedInUser>(this._baseApiUrl + 'account/register', userInput)
        .pipe(map(res => {
          if (res) {
            this.setCurrentUser(res);

            this.router.navigateByUrl('members/member-list')
          }

          return null;
        }))

    return response$;
  }

  login(userInput: Login): Observable<LoggedInUser | null> {
    let response$: Observable<LoggedInUser | null> =
      this.http.post<LoggedInUser>(this._baseApiUrl + 'account/login', userInput)
        .pipe(map(res => {
          if (res) {
            this.setCurrentUser(res);

            this.router.navigateByUrl('members/member-list')
          }

          return null;
        }))

    return response$;
  }

  logout(): void {
    this.loggedInUserSig.set(null)

    if (isPlatformBrowser(this.platformId)){
      localStorage.clear();
    }

    this.router.navigateByUrl('account/login');
  }

  setCurrentUser(userInput: LoggedInUser): void {
    this.loggedInUserSig.set(userInput);

    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem('loggedIn', JSON.stringify(userInput));
    }
  }
}
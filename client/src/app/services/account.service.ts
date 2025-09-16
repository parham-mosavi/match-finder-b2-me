import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Member } from '../models/member.model.js';
import { AppUser } from '../models/app-user.model.js';
import { LoggedInUser } from '../models/logged-in-model.js';
import { Login } from '../models/login.model.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  http = inject(HttpClient);
  router = inject(Router);
  loggedInUserSig = signal<LoggedInUser | null>(null);

  private readonly _baseApiUrl: string = 'http://localhost:5000/api/'

  register(userInput: AppUser): Observable<LoggedInUser | null> {
    let response$: Observable<LoggedInUser | null> =
      this.http.post<LoggedInUser>(this._baseApiUrl + 'account/register', userInput)
        .pipe(map(res => {
          if (res) {
            this.setCurrentUser(res);
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
          }

          return null;
        }))

    return response$;
  }

  getAll(): Observable<Member[]> {
    let response$: Observable<Member[]> = this.http.get<Member[]>(this._baseApiUrl + 'member/getall');

    return response$;
  }

  getByUserName(userName: string): Observable<Member> {
    let response$: Observable<Member> = this.http.get<Member>(this._baseApiUrl + 'member/get-by-username/' + userName);

    return response$;
  }

  updateById(userId: string, userInput: AppUser): Observable<Member> {
    let response$: Observable<Member> = this.http.put<Member>(this._baseApiUrl + 'user/updatebyid/' + userId, userInput);

    return response$;
  }

  logout(): void {
    this.loggedInUserSig.set(null)

    localStorage.clear();

    this.router.navigateByUrl('account/login');
  }

  setCurrentUser(userInput: LoggedInUser): void {
    this.loggedInUserSig.set(userInput);

    localStorage.setItem('loggedIn', JSON.stringify(userInput));
  }
}
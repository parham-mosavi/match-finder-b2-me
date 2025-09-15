import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Member } from '../models/member.model.js';
import { AppUser } from '../models/app-user.model.js';
import { LoggedIn } from '../models/logged-in-model.js';
import { Login } from '../models/login.model.js';
// import { LoggedIn } from '../models/logged-in.model';
// import { Login } from '../models/login.model';
// import { Member } from '../models/member.model';
// import { AppUser } from '../models/app-user.model.ts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  http = inject(HttpClient);

  private readonly _baseApiUrl: string = 'http://localhost:5000/api/'

  register(userInput: AppUser): Observable<LoggedIn | null> {
    let response$: Observable<LoggedIn | null> =
      this.http.post<LoggedIn>(this._baseApiUrl + 'account/register', userInput)
        .pipe(map(res => {
          if (res) {
            this.setCurrentUser(res);
          }

          return null;
        }))

    return response$;
  }

  login(userInput: Login): Observable<LoggedIn | null> {
    let response$: Observable<LoggedIn | null> =
      this.http.post<LoggedIn>(this._baseApiUrl + 'account/login', userInput)
      .pipe(map(res => {
        if (res) {
          this.setCurrentUser(res);
        }

        return null;
      }))

    return response$;
  }

  getAll(): Observable<Member[]> {
    let response$: Observable<Member[]> = this.http.get<Member[]>('http://localhost:5000/api/member/getall');

    return response$;
  }

  getByUserName(userName: string): Observable<Member> {
    let response$: Observable<Member> = this.http.get<Member>('http://localhost:5000/api/member/get-by-username/' + userName);

    return response$;
  }

  updateById(userId: string, userInput: AppUser): Observable<Member> {
    let response$: Observable<Member> = this.http.put<Member>('http://localhost:5000/api/user/updatebyid/' + userId, userInput);

    return response$;
  }

  setCurrentUser(userInput: LoggedIn): void {
    localStorage.setItem('loggedIn', JSON.stringify(userInput));
  }
}
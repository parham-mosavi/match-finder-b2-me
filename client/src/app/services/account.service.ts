import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  register(userInput: AppUser): Observable<LoggedIn> {
    let response$: Observable<LoggedIn> = this.http.post<LoggedIn>('http://localhost:5283/api/account/register', userInput);

    return response$;
  }

  login(userInput: Login): Observable<LoggedIn> {
    let response$: Observable<LoggedIn> = this.http.post<LoggedIn>('http://localhost:5283/api/account/login', userInput);

    return response$;
  }

  getAll(): Observable<Member[]> {
    let response$: Observable<Member[]> = this.http.get<Member[]>('http://localhost:5283/api/member/getall');

    return response$;
  }

  getByUserName(userName: string): Observable<Member> {
    let response$: Observable<Member> = this.http.get<Member>('http://localhost:5283/api/member/get-by-username/' + userName);

    return response$;
  }

  updateById(userId: string, userInput: AppUser): Observable<Member> {
    let response$: Observable<Member> = this.http.put<Member>('http://localhost:5283/api/user/updatebyid/' + userId, userInput);

    return response$;
  }
}
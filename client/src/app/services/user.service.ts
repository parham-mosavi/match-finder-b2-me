import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';
import { AppUser } from '../models/app-user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)
  private readonly _baseApiUrs : string = environment.baseApiUrl + 'api/'

  updateById(userId: string, userInput: AppUser): Observable<Member> {
    let response$: Observable<Member> =
     this.http.put<Member>(this._baseApiUrs + 'user/updatebyid/' + userId, userInput);

    return response$;
  }
}

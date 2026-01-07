import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { isPlatformBrowser, JsonPipe } from '@angular/common';
import { Member } from '../../../models/member.model';
import { LoggedInUser } from '../../../models/logged-in-model';

@Component({
  selector: 'app-user-edit',
  imports: [],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  private _platformId = inject(PLATFORM_ID);
  private _memberService = inject(MemberService);
  member: Member | undefined;
  UserLogin: boolean | undefined;

  ngOnInit(): void {
    this.getMember()
  }

  getMember(): void {
    if (isPlatformBrowser(this._platformId)) {
      let loggedInUserStr: string | null = localStorage.getItem('loggedIn')

      if (loggedInUserStr) {
        let loggedInUserObj: LoggedInUser = JSON.parse(loggedInUserStr);

        this._memberService.getByUserName(loggedInUserObj.userName).subscribe({
          next: (res) => {
            this.member = res;
            console.log(this.member);
          }
        })
      }
    }
  }
}

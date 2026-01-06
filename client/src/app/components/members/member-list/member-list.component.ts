import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Member } from '../../../models/member.model';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MemberService } from '../../../services/member.service';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{
  accountservics = inject(AccountService);
  memberservics = inject(MemberService);
  members: Member[] | undefined;
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    let allMembers: Observable<Member[]> = this.memberservics.getAll();

    allMembers.subscribe({
      next: (res) => {
        console.log(res)
        this.members = res
      }
    });
  }
}

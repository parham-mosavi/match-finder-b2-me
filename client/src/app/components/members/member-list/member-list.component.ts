import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Member } from '../../../models/member.model';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-member-list',
  imports: [MatButtonModule,  MatCardModule, MatIconModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{
  accountservics = inject(AccountService)
  members: Member[] | undefined;
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    let allMembers: Observable<Member[]> = this.accountservics.getAll();

    allMembers.subscribe({
      next: (res) => {
        console.log(res)
        this.members = res
      }
    });
  }
}

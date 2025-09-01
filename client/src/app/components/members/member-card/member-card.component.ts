import { materialModuleSpecifier } from '@angular/cdk/schematics';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AccountService } from '../../../services/account.service';
import { Observable } from 'rxjs';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-member-card',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {

}

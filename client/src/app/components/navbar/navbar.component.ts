import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule, RouterLink, MatMenuModule,CommonModule,MatDividerModule,MatListModule,
    MatButtonModule, MatToolbarModule, MatIconModule,
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  accountServis = inject(AccountService);

  logout() {
    this.accountServis.logout();
  }
}

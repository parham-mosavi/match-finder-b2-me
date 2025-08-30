import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule, RouterModule, MatIconModule,
    MatButton
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}

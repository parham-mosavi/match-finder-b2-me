import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Login } from '../../../models/login.model';
import { Observable, Subscription } from 'rxjs';
import { LoggedInUser } from '../../../models/logged-in-model';
import { MatInputModule } from "@angular/material/input";
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [RouterModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  accountService = inject(AccountService);
 fB = inject(FormBuilder);

  subscribedlogin: undefined | Subscription;

  ngOnDestroy(): void {
    this.subscribedlogin?.unsubscribe();
    console.log('un sub login')
  }

  loginFg = this.fB.group({
    userNameCtrl: ['', [Validators.required]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  });

  get UserNameCtrl(): FormControl {
    return this.loginFg.get('userNameCtrl') as FormControl;
  }

  get PasswordCtrl(): FormControl {
    return this.loginFg.get('passwordCtrl') as FormControl;
  }

  login(): void {
    let userIn: Login = {
      userName: this.UserNameCtrl.value,
      password: this.PasswordCtrl.value
    } //???????????????????????????????????????????????????????????????????????????????????????????

    let loginRes$: Observable<LoggedInUser | null> = this.accountService.login(userIn);

    loginRes$.subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }
}
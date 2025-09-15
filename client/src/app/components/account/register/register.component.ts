import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { LoggedIn } from '../../../models/logged-in-model';
import { AppUser } from '../../../models/app-user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatButtonModule, MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  accountService = inject(AccountService);
  fB = inject(FormBuilder);

  userResponse: LoggedIn | undefined | null;
  error: string | undefined;

  //#region 
  registerFg = this.fB.group({
    emailCtrl: ['', [Validators.required, Validators.email]], // formControl
    userNameCtrl: ['', [Validators.required]],
    ageCtrl: [, [Validators.required, Validators.min(18), Validators.max(70)]],
    passwordCtrl: ['', [Validators.minLength(4), Validators.maxLength(8)]],
    confirmPasswordCtrl: ['', [Validators.required]],
    genderCtrl: '',
    cityCtrl: '',
    countryCtrl: ''
  });

  get EmailCtrl(): FormControl {
    return this.registerFg.get('emailCtrl') as FormControl;
  }

  get UserNameCtrl(): FormControl {
    return this.registerFg.get('userNameCtrl') as FormControl;
  }

  get AgeCtrl(): FormControl {
    return this.registerFg.get('ageCtrl') as FormControl;
  }

  get PasswordCtrl(): FormControl {
    return this.registerFg.get('passwordCtrl') as FormControl;
  }

  get ConfirmPasswordCtrl(): FormControl {
    return this.registerFg.get('confirmPasswordCtrl') as FormControl;
  }

  get GenderCtrl(): FormControl {
    return this.registerFg.get('genderCtrl') as FormControl;
  }

  get CityCtrl(): FormControl {
    return this.registerFg.get('cityCtrl') as FormControl;
  }

  get CountryCtrl(): FormControl {
    return this.registerFg.get('countryCtrl') as FormControl;
  }
  //#endregion

  register(): void {
    let userInput: AppUser = {
      email: this.EmailCtrl.value,
      userName: this.UserNameCtrl.value,
      age: this.AgeCtrl.value,
      password: this.PasswordCtrl.value,
      confirmPassword: this.ConfirmPasswordCtrl.value,
      gender: this.GenderCtrl.value,
      city: this.CityCtrl.value,
      country: this.CountryCtrl.value
    }

    let response$: Observable<LoggedIn | null> = this.accountService.register(userInput);

    response$.subscribe({
      next: (res) => {
        console.log(res);
        this.userResponse = res;
      },
      error: (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    });
  }
}

//     response$.subscribe({
//       next: (res) => {
//         console.log(res);
//         this.userResponse = res;
//       },
//       error: (err) => {
//         console.log(err.error);
//         this.error = err.error;
//       }
//     });
//   }
// }

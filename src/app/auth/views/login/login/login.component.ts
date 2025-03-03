import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Login,
  LoginSuccess,
  LoginFailure,
} from '../../../../dashboard/stores/auth/auth.actions';
import { Router, RouterLink } from '@angular/router';
import { Actions, Store, ofActionDispatched } from '@ngxs/store';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AuthSelectors } from '../../../../dashboard/stores/auth/auth.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  store = inject(Store);
  fb = inject(FormBuilder);
  actions$ = inject(Actions);
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isLoading = toSignal(this.store.select(AuthSelectors.slices.isLoading));

  constructor() {
    this.actions$
      .pipe(
        ofActionDispatched(LoginSuccess),
        takeUntilDestroyed(),
        tap(() => this.router.navigate(['/']))
      )
      .subscribe();
    this.actions$
      .pipe(
        ofActionDispatched(LoginFailure),
        takeUntilDestroyed(),
        tap(() =>
          this.loginForm.setErrors({
            loginError: this.store.selectSnapshot(
              AuthSelectors.slices.loginError
            ),
          })
        )
      )
      .subscribe();
  }

  login(): void {
    this.store.dispatch(new Login(this.loginForm.value));
  }
}

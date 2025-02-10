import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { AuthSelectors } from '../../../../dashboard/stores/auth/auth.selectors';
import { PasswordValidator } from '../../../../shared/validators/password.validator';
import { PasswordMatchValidator } from '../../../../shared/validators/password-match.validator';
import {
  ResetPassword,
  ResetPasswordFailure,
  ResetPasswordSuccess,
} from '../../../../dashboard/stores/auth/auth.actions';
import { tap } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AsyncPipe, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  store = inject(Store);
  actions$ = inject(Actions);
  router = inject(Router);
  fb = inject(FormBuilder);
  @Input({ alias: 'token' }) token!: string;
  @Input({ alias: 'email' }) email!: string;

  resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator]],
    passwordConfirm: ['', [Validators.required, PasswordMatchValidator]],
  });

  isLoading = toSignal(this.store.select(AuthSelectors.slices.isLoading));
  resetPasswordError: boolean = false;
  resetPasswordSuccess: boolean = false;

  constructor() {
    this.actions$
      .pipe(
        ofActionDispatched(ResetPasswordSuccess),
        takeUntilDestroyed(),
        tap(() => {
          this.resetPasswordSuccess = true;
          this.resetPasswordError = false;
          this.resetPasswordForm.reset();
          // Redirect to login page after 4sec
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 4000);
        })
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionDispatched(ResetPasswordFailure),
        takeUntilDestroyed(),
        tap(() => {
          this.resetPasswordError = true;
          this.resetPasswordSuccess = false;
          this.resetPasswordForm.reset();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    console.log('token:', this.token);
    console.log('email:', this.email);
    this.resetPasswordForm.patchValue({ email: this.email });
  }

  resetPassword(): void {
    const email = this.resetPasswordForm.value.email;
    const password = this.resetPasswordForm.value.password;
    if (email && password && this.token) {
      this.store.dispatch(new ResetPassword(email, password, this.token));
    }
  }
}

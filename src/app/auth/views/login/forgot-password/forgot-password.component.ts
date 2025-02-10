import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { AuthSelectors } from '../../../../dashboard/stores/auth/auth.selectors';
import {
  ForgotPassword,
  ForgotPasswordFailure,
  ForgotPasswordSuccess,
} from '../../../../dashboard/stores/auth/auth.actions';
import { tap } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  store = inject(Store);
  actions$ = inject(Actions);
  router = inject(Router);

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isLoading = toSignal(this.store.select(AuthSelectors.slices.isLoading));
  forgotPasswordError: boolean = false;
  forgotPasswordSuccess: boolean = false;
  submit: boolean = false;
  msgError: string = '';

  constructor() {
    this.actions$
      .pipe(
        ofActionDispatched(ForgotPasswordSuccess),
        takeUntilDestroyed(),
        tap(() => {
          this.forgotPasswordSuccess = true;
          this.forgotPasswordError = false;
          this.forgotPasswordForm.reset();
        })
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionDispatched(ForgotPasswordFailure),
        takeUntilDestroyed(),
        tap((res) => {
          this.forgotPasswordError = true;
          console.log(res);
          this.msgError = res.error;
          this.forgotPasswordSuccess = false;
          this.forgotPasswordForm.reset();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  forgotPassword(): void {
    const email = this.forgotPasswordForm.value.email;
    if (email) {
      this.store.dispatch(new ForgotPassword(email));
    }
  }
}

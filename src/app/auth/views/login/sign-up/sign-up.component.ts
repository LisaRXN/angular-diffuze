import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
//import { initFlowbite } from 'flowbite';
import {
  Register,
  RegisterSuccess,
  RegisterFailure,
} from '../../../../dashboard/stores/auth/auth.actions';
import { Actions, Store, ofActionDispatched } from '@ngxs/store';
import { AuthSelectors } from '../../../../dashboard/stores/auth/auth.selectors';
import { SetRegisterStep } from '../../../../dashboard/stores/auth/auth.actions';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
/* import { CgvComponent } from '../../../shared/components/modals/cgv/cgv.component';
import { CgvProComponent } from '../../../shared/components/modals/cgv-pro/cgv-pro.component';
import { PrivacyComponent } from '../../../shared/components/modals/privacy/privacy.component'; */
import { PasswordMatchValidator } from '../../../../shared/validators/password-match.validator';
import { PhoneValidator } from '../../../../shared/validators/phone.validator';
import { PasswordValidator } from '../../../../shared/validators/password.validator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  store = inject(Store);
  actions$ = inject(Actions);
  router = inject(Router);
  step = toSignal(this.store.select(AuthSelectors.slices.registerStep), {
    initialValue: 1,
  });
  verified = true;
  isLoading = toSignal(this.store.select(AuthSelectors.slices.isLoading));
  sources = [
    { id: 1, description: "J'ai effectué une recherche Google" },
    { id: 2, description: "J'ai reçu un SMS" },
    { id: 3, description: "J'ai reçu un mail" },
    {
      id: 4,
      description: 'Recommandation (amis, famille, collègues, proches)',
    },
    { id: 5, description: 'Sur les réseaux sociaux' },
    { id: 6, description: 'Presse' },

    { id: 10, description: 'Vu à la télé' },
    { id: 9, description: 'Autres' },
  ];

  constructor(private cdr: ChangeDetectorRef) {
    this.actions$
      .pipe(
        ofActionDispatched(RegisterSuccess),
        takeUntilDestroyed(),
        tap(() => this.nextStep())
      )
      .subscribe();
    this.actions$
      .pipe(
        ofActionDispatched(RegisterFailure),
        takeUntilDestroyed(),
        tap(() =>
          this.registerForm.setErrors({
            registerError: this.store.selectSnapshot(
              AuthSelectors.slices.registerError
            ),
          })
        )
      )
      .subscribe();

    effect(() => {
      if (this.step() > 0) {
        // wait 1 seconde
        setTimeout(() => {
          console.log('initFlowbite');
          // initFlowbite();
        }, 0);
      }
    });
  }

  registerForm = this.fb.group({
    personalInfo: this.fb.group({
      user_type: ['', Validators.required],
    }),

    accountInfo: this.fb.group({
      gender: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, PhoneValidator]],
      StageOfSale: [''],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidator]],
      passwordConfirm: ['', [Validators.required, PasswordMatchValidator]],
      source_id: ['', Validators.required],
      termsOfUse: [false],
    }),
    accountInfoPRO: this.fb.group({
      gender: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, PhoneValidator]],
      society: ['', Validators.required],
      job: [''],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidator]],
      passwordConfirm: ['', [Validators.required, PasswordMatchValidator]],
      source_id: ['', Validators.required],
      termsOfUse: [false],
    }),
  });

  markAllAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

  setStep(step: number) {
    this.store.dispatch(new SetRegisterStep(step));
  }

  nextStep() {
    const nextStep = this.step() + 1;
    if (nextStep <= 3) {
      this.setStep(nextStep);
    }
  }

  previousStep() {
    const previousStep = this.step() - 1;
    if (previousStep >= 1) {
      this.setStep(previousStep);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.store.dispatch(new SetRegisterStep(1));
  }

  register() {
    console.log('Form data: ', this.registerForm.value);
    const userType = this.registerForm
      .get('personalInfo')
      ?.get('user_type')?.value;
    const accountInfoGroup =
      userType === '1' ? 'accountInfo' : 'accountInfoPRO';

    if (this.registerForm.get(accountInfoGroup)?.invalid) {
      this.markAllAsTouched(
        this.registerForm.get(accountInfoGroup) as FormGroup
      );
      return;
    }
    this.store.dispatch(new Register(this.registerForm.value));
  }
}

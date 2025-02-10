import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PasswordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const parent = control.parent;
  if (!parent) {
    return null;
  }

  const password = parent.get('password');
  const passwordConfirm = control;

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.errors && !passwordConfirm.errors['passwordMismatch']) {
    // return if another validator has already found an error on the passwordConfirm
    return null;
  }

  // set error on matchingControl if validation fails
  if (password.value !== passwordConfirm.value) {
    return { passwordMismatch: true };
  } else {
    return null;
  }
};

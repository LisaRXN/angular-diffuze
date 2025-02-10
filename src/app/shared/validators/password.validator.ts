import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  
  if (!value) {
    return null;
  }

  const errors: ValidationErrors = {};

  // Minimum length
  if (value.length < 8) {
    errors['minlength'] = {
      requiredLength: 8,
      actualLength: value.length
    };
  }

  // Contains uppercase letter
  if (!/[A-Z]/.test(value)) {
    errors['uppercase'] = true;
  }

  // Contains lowercase letter
  if (!/[a-z]/.test(value)) {
    errors['lowercase'] = true;
  }

  // Contains number
  if (!/[0-9]/.test(value)) {
    errors['number'] = true;
  }

  // Contains special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    errors['special'] = true;
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

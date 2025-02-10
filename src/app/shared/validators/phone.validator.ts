import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PhoneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  if (!value) {
    return null;
  }

  const errors: ValidationErrors = {};

  // Minimum length
  if (value.length < 10) {
    errors['minlength'] = {
      requiredLength: 10,
      actualLength: value.length
    };
  }

  // Maximum length
  if (value.length > 10) {
    errors['maxlength'] = {
      requiredLength: 10,
      actualLength: value.length
    };
  }

  // Contains only numbers
  if (!/^[0-9]*$/.test(value)) {
    errors['pattern'] = true;
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

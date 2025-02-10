import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IntegerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isInteger = Number.isInteger(control.value);
    console.log('isInteger', isInteger);
    return isInteger ? null : { notInteger: true };
  };
}

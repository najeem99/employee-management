import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function employeeCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const code = control.value;

        // Check if the code exists
        if (!code) return { required: true };

        // Define the validation rules
        const isFirstCharValid = /^[A-Z#]/.test(code);
        const areDigitsValid = /^[A-Z#][0-9]{3,4}/.test(code);
        const areNextCharsValid = /^[A-Z#][0-9]{3,4}[A-Z]{2}/.test(code);
        const isLengthValid = (code.length === 8 && /\d$/.test(code)) || (code.length === 10 && /\d{2}$/.test(code));

        // Check all validation rules
        if (!isFirstCharValid || !areDigitsValid || !areNextCharsValid || !isLengthValid) {
            return { invalidEmployeeCode: true };  // Return error object if validation fails
        }

        return null; // Return null if validation passes
    };
}

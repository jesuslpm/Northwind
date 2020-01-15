import { AbstractControl } from '@angular/forms';

export function validatePostiveInteger(control: AbstractControl) {
    if(!(control.value >>> 0 === parseFloat(control.value) && (parseFloat(control.value) != 0.0))){
        return { positiveInteger: true }; 
    }
    return null;
}

export function validatePositiveDecimal(control: AbstractControl) {
    if(control.value && (control.value <= 0 || control.value > 100)){
        return { positiveDecimal: true }; 
    }
    return null;
}
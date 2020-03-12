import { AbstractControl } from '@angular/forms';

export function ValidateTime(control: AbstractControl) {
    var objRegExp = new RegExp('^(\\d|\\d\\d):([0-5]\\d):([0-5]\\d)$'); //0:00:00 99:59:59

    if (!objRegExp.test(control.value)) {
      return { format: true };
    }
    return null;
}
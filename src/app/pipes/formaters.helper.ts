import { DecimalPipe } from '@angular/common';
import { SecondsToTimePipe } from './secondsToTimePipe';


export class FormattersHelper {

  constructor() {}

  decimalFormatter(value, digits: string = '1.3-3') {
    const decimalPipe = new DecimalPipe(navigator.language);

    return Number(decimalPipe.transform(value, digits));
  }

  timeFormatter(value: number): string {
    const timePipe = new SecondsToTimePipe();

    return timePipe.transform(value);
  }

}
import { DecimalPipe } from '@angular/common';
import { SecondsToTimePipe } from '../pipes/secondsToTimePipe';


export class FormattersHelper {

  constructor() {}

  /** */
  decimalFormatter(value, digits: string = '1.3-3') {
    const decimalPipe = new DecimalPipe(navigator.language);

    return Number(decimalPipe.transform(value, digits));
  }

  /** */
  secondsToTimeFormatter(value: number): string {
    const timePipe = new SecondsToTimePipe();

    return timePipe.transform(value);
  }

    /** */
    timeToSecondsFormatter(time: string): number {
      var timeArray = time.split(':');

      return (+timeArray[0]) * 60 * 60 + (+timeArray[1]) * 60 + (+timeArray[2] || 0);
    }
}
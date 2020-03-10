import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTimePipe'
})

export class SecondsToTimePipe implements PipeTransform {
  transform(value: number): string {
      var hours: string = String(Math.floor(value/3600)),
            minutes: string = String(Math.floor((value-3600)/60)),
            seconds:  string = String(Math.floor((value-3660)%60));

    if (hours.length === 1) hours = '0' + hours;
    if (minutes.length === 1) minutes = '0' + minutes;
    if (seconds.length === 1) seconds = '0' + seconds;

    return hours + ':' + minutes + ':' + seconds;
  }
}
import { SportsService } from 'src/app/services/sports/sports.service';
import { Observable } from 'rxjs';
import { Sport } from 'src/app/models/sport';

export class ImportSportsHelper {

  fieldNames: string[];

  constructor(
    private sportsService: SportsService
  ) { }

  import(data): Observable<Sport[]> {
    const me = this;
    var sport: Sport,
        sports: Sport[] = [],
        userNameIndex,
        nameIndex,
        descriptionIndex,
        activeIndex;

    me.fieldNames = data[0];
    userNameIndex = me.fieldNames.indexOf('UserName');
    nameIndex = me.fieldNames.indexOf('Name');
    descriptionIndex = me.fieldNames.indexOf('Description');
    activeIndex = me.fieldNames.indexOf('Active');

    for (var f=1; f<data.length; f++)
    {
      var rowData = data[f];

      sport = new Sport;
      sport.userName = rowData[userNameIndex];
      sport.name = rowData[nameIndex];
      sport.description = rowData[descriptionIndex];
      sport.active = rowData[activeIndex].trim() === 'true' ? true : false;

      sports.push(sport);
    }

    return me.sportsService.createSports(sports);
  }
};

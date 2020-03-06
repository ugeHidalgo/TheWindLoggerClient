import { SportTypesService } from 'src/app/services/sportTypes/sport-types.service';
import { Observable } from 'rxjs';
import { SportType } from 'src/app/models/sportType';

export class ImportSportTypesHelper {

  fieldNames: string[];

  constructor(
    private sportTypesService: SportTypesService
  ) { }

  import(data): Observable<SportType[]> {
    const me = this;
    var sportType: SportType,
        sportTypes: SportType[] = [],
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

      sportType = new SportType;
      sportType.userName = rowData[userNameIndex];
      if (!sportType.userName) continue;

      sportType.name = rowData[nameIndex];
      sportType.description = rowData[descriptionIndex];
      sportType.active = rowData[activeIndex].trim() === 'true' ? true : false;

      sportTypes.push(sportType);
    }

    return me.sportTypesService.createSportTypes(sportTypes);
  }
};

import { SpotsService } from 'src/app/services/spots/spots.service';
import { Observable } from 'rxjs';
import { Spot } from 'src/app/models/spot';

export class ImportSpotsHelper {

  fieldNames: string[];

  constructor(
    private spotsService: SpotsService
  ) { }

  import(data): Observable<Spot[]> {
    const me = this;
    var spot: Spot,
        spots: Spot[] = [],
        userNameIndex,
        nameIndex,
        descriptionIndex,
        countryIndex,
        provinceIndex,
        placeIndex,
        latIndex,
        longIndex,
        activeIndex;

    me.fieldNames = data[0];
    userNameIndex = me.fieldNames.indexOf('UserName');
    nameIndex = me.fieldNames.indexOf('Name');
    descriptionIndex = me.fieldNames.indexOf('Description');
    countryIndex = me.fieldNames.indexOf('Country');
    provinceIndex = me.fieldNames.indexOf('Province');
    placeIndex = me.fieldNames.indexOf('Place');
    latIndex = me.fieldNames.indexOf('Lat');
    longIndex = me.fieldNames.indexOf('Long');
    activeIndex = me.fieldNames.indexOf('Active');

    for (var f=1; f<data.length; f++)
    {
      var rowData = data[f];

      spot = new Spot;
      spot.userName = rowData[userNameIndex];
      spot.name = rowData[nameIndex];
      spot.description = rowData[descriptionIndex];
      spot.country = rowData[countryIndex];
      spot.province = rowData[provinceIndex];
      spot.place = rowData[placeIndex];
      spot.lat = rowData[latIndex];
      spot.long = rowData[longIndex];
      spot.active = rowData[activeIndex].trim() === 'true' ? true : false;

      spots.push(spot);
    }

    return me.spotsService.createSpots(spots);
  }
};

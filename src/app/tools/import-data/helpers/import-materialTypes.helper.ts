import { MaterialTypesService } from 'src/app/services/materialTypes/material-types.service';
import { Observable } from 'rxjs';
import { MaterialType } from 'src/app/models/materialType';

export class ImportMaterialTypesHelper {

  fieldNames: string[];

  constructor(
    private materialTypesService: MaterialTypesService
  ) { }

  import(data): Observable<MaterialType[]> {
    const me = this;
    var materialType: MaterialType,
        materialTypes: MaterialType[] = [],
        userNameIndex,
        nameIndex,
        descriptionIndex,
        sportIndex,
        activeIndex;

    me.fieldNames = data[0];
    userNameIndex = me.fieldNames.indexOf('UserName');
    nameIndex = me.fieldNames.indexOf('Name');
    descriptionIndex = me.fieldNames.indexOf('Description');
    sportIndex = me.fieldNames.indexOf('Sport');
    activeIndex = me.fieldNames.indexOf('Active');

    for (var f=1; f<data.length; f++)
    {
      var rowData = data[f];

      materialType = new MaterialType;
      materialType.userName = rowData[userNameIndex];
      materialType.name = rowData[nameIndex];
      materialType.description = rowData[descriptionIndex];
      materialType.sport = rowData[sportIndex];
      materialType.active = rowData[activeIndex].trim() === 'true' ? true : false;

      materialTypes.push(materialType);
    }

    return me.materialTypesService.createMaterialTypes(materialTypes);
  }
};

import { Observable } from 'rxjs';
import { Material } from 'src/app/models/material';
import { MaterialsService } from 'src/app/services/materials/materials-service.service';

export class ImportMaterialsHelper {

  fieldNames: string[];

  constructor(
    private materialsService: MaterialsService
  ) { }

  import(data): Observable<Material[]> {
    const me = this;
    var material: Material,
        materials: Material[] = [],
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

      material = new Material;
      material.userName = rowData[userNameIndex];
      material.name = rowData[nameIndex];
      material.description = rowData[descriptionIndex];
      material.active = rowData[activeIndex].trim() === 'true' ? true : false;

      materials.push(material);
    }

    return me.materialsService.createMaterials(materials);
  }
};

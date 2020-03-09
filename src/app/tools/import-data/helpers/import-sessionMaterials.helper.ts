import { Observable } from 'rxjs';
import { SessionMaterialsService } from 'src/app/services/sessionMaterials/session-materials.service';
import { SessionMaterial } from 'src/app/models/sessionMaterial';

export class ImportSessionMaterialsHelper {
    private fieldNames: string[];

  constructor(
    private sessionMaterialsService: SessionMaterialsService,
  ) {}

  import(data): Observable<SessionMaterial[]> {
    const me = this;
    var sessionMaterial: SessionMaterial,
        sessionMaterials: SessionMaterial[] = [],
        userNameIndex,
        sessionNameIndex,
        materialIndex,
        usePercentageIndex,
        timeIndex,
        distanceIndex,
        maxSpeedIndex;

    me.fieldNames = data[0];
    userNameIndex = me.fieldNames.indexOf('UserName');
    sessionNameIndex = me.fieldNames.indexOf('SessionName');
    materialIndex = me.fieldNames.indexOf('Material');
    usePercentageIndex = me.fieldNames.indexOf('UsePercentage');
    timeIndex = me.fieldNames.indexOf('Time');
    distanceIndex = me.fieldNames.indexOf('Distance');
    maxSpeedIndex = me.fieldNames.indexOf('MaxSpeed');

    for (var f=1; f<data.length; f++)
    {
      var rowData = data[f];

      sessionMaterial = new SessionMaterial;
      sessionMaterial.userName = rowData[userNameIndex];
      if (!sessionMaterial.userName) continue;

      sessionMaterial.session = rowData[sessionNameIndex];
      sessionMaterial.material = rowData[materialIndex];
      sessionMaterial.usePercentage = rowData[usePercentageIndex];
      sessionMaterial.distance = rowData[distanceIndex];
      sessionMaterial.time = rowData[timeIndex];
      sessionMaterial.maxSpeed = rowData[maxSpeedIndex];

      sessionMaterials.push(sessionMaterial);
    }

    return me.sessionMaterialsService.createSessionMaterials(sessionMaterials);
  }
};

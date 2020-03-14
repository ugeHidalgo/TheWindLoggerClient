import { Observable } from 'rxjs';
import { Session } from 'src/app/models/session';
import { ImportFieldTools } from './import-fieldTools';
import { SessionsService } from 'src/app/services/sessions/sessions.service';

export class ImportSessionsHelper {
    private importFielTools: ImportFieldTools;
    private fieldNames: string[];

  constructor(
    private sessionsService: SessionsService,
  ) {
    this.importFielTools = new ImportFieldTools();
  }

  import(data): Observable<Session[]> {
    const me = this;
    var session: Session,
        sessions: Session[] = [],
        userNameIndex,
        nameIndex,
        descriptionIndex,
        sessionDateIndex,
        sessionTimeIndex,
        sessionDistanceIndex,
        sportIndex,
        spotIndex,
        raceIndex,
        indoorIndex,
        valueIndex,
        effortIndex,
        maxSpeedIndex,
        activeIndex;

    me.fieldNames = data[0];
    userNameIndex = me.fieldNames.indexOf('UserName');
    nameIndex = me.fieldNames.indexOf('Name');
    descriptionIndex = me.fieldNames.indexOf('Description');
    sessionDateIndex = me.fieldNames.indexOf('SessionDate');
    sessionTimeIndex = me.fieldNames.indexOf('SessionTime');
    sessionDistanceIndex = me.fieldNames.indexOf('SessionDistance');
    sportIndex = me.fieldNames.indexOf('Sport');
    spotIndex = me.fieldNames.indexOf('Spot');
    raceIndex = me.fieldNames.indexOf('Race');
    indoorIndex = me.fieldNames.indexOf('Indoor');
    valueIndex = me.fieldNames.indexOf('Value');
    effortIndex = me.fieldNames.indexOf('Effort');
    maxSpeedIndex = me.fieldNames.indexOf('MaxSpeed');
    activeIndex = me.fieldNames.indexOf('Active');

    for (var f=1; f<data.length; f++)
    {
      var rowData = data[f];

      session = new Session;
      session.userName = rowData[userNameIndex];
      if (!session.userName) continue;

      session.name = rowData[nameIndex];
      session.description = rowData[descriptionIndex];
      session.description = rowData[descriptionIndex];
      session.sessionDate = me.importFielTools.excelDateToJSDate(rowData[sessionDateIndex]);
      session.sessionTime = rowData[sessionTimeIndex];
      session.sessionDistance = rowData[sessionDistanceIndex];
      session.sport = rowData[sportIndex];
      session.spot = rowData[spotIndex];
      session.race = rowData[raceIndex];
      session.indoor = rowData[indoorIndex];
      session.value = rowData[valueIndex];
      session.effort = rowData[effortIndex];
      session.maxSpeed = rowData[maxSpeedIndex];
      session.maxPower = 0;
      session.medPower = 0;
      session.active = rowData[activeIndex].trim() === 'true' ? true : false;

      sessions.push(session);
      console.log('Imported session :' + session.name + ' (' + session.sessionDate + ')');
    }

    console.log('Imported sessions data from excell, sending to server to create.');
    return me.sessionsService.importSessions(sessions);
  }
};

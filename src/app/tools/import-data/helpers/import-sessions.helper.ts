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
      session.active = rowData[activeIndex].trim() === 'true' ? true : false;

      sessions.push(session);
    }

    return me.sessionsService.createSessions(sessions);
  }
};
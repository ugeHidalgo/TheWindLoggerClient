import { Observable } from 'rxjs';
import { Session } from 'src/app/models/session';
import { ImportFieldTools } from './import-fieldTools';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { GlobalsService } from 'src/app/globals/globals.service';

export class ImportStravaSessionsHelper {
    private importFielTools: ImportFieldTools;
    private fieldNames: string[];

  constructor(
    private sessionsService: SessionsService,
    private globals: GlobalsService
  ) {
    this.importFielTools = new ImportFieldTools();
  }

  import(sessionsToImport): Observable<Session[]> {
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

    sessionsToImport.forEach(sessionToImport => {
        session = new Session;
        session.userName = me.globals.userNameLogged;
        session.name = sessionToImport.id;
        session.description = sessionToImport.name;
        session.sessionDate = sessionToImport.start_date;
        session.sessionTime = sessionToImport.movingTime;
        session.sessionDistance = sessionToImport.distance;
        session.sport = sessionToImport.Ride;
        session.spot = sessionToImport.location_city;
        session.race = false;
        session.indoor = sessionToImport.trainer;
        session.value = 0;
        session.effort = 0;
        session.maxSpeed = sessionToImport.max_speed;
        session.maxPower = 0;
        session.medPower = sessionToImport.average_watts;
        session.active = true;

        sessions.push(session);
        console.log('Imported strava session :' + session.name + ' (' + session.sessionDate + ')');
    });    

    console.log('Imported sessions data from strava, sending to server to create.');
    return;
    //return me.sessionsService.importSessions(sessions);
  }
};

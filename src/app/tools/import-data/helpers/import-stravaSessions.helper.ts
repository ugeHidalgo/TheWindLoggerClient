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
    private globals: GlobalsService,    
  ) {
    this.importFielTools = new ImportFieldTools();
  }

  import(sessionsToImport): Observable<Session[]> {
    const me = this;
    var session: Session,
        sessions: Session[] = [];

    sessionsToImport.forEach(sessionToImport => {
        session = new Session;
        session.userName = me.globals.userNameLogged;
        session.name = sessionToImport.id;
        session.description = sessionToImport.name;
        session.sessionDate = sessionToImport.start_date;
        session.sessionTime = sessionToImport.moving_time;
        session.sessionDistance = sessionToImport.distance/1000;
        session.sport = me.mapSport(sessionToImport.type, sessionToImport.trainer);
        session.spot = me.mapSpot(sessionToImport);
        session.race = false;
        session.indoor = sessionToImport.trainer;
        session.value = 1;
        session.effort = 1;
        session.maxSpeed = sessionToImport.max_speed;
        session.maxPower = 0;
        session.medPower = sessionToImport.average_watts ? sessionToImport.average_watts : 0;
        session.active = true;

        sessions.push(session);
        console.log('Imported strava session :' + session.name + ' (' + session.sessionDate + ')');
    });    

    console.log('Imported ' + sessionsToImport.length + 'sessions data from strava, sending to server to be added to database.');
    return me.sessionsService.importSessions(sessions);
  }


  private mapSport(stravaSportType, isIndoorSession) {
      let sportName : any;

      switch (stravaSportType) {
            case 'Run':
                if (isIndoorSession) {
                    sportName = 'Carrera cinta';
                } else {
                    sportName = 'Carrera';
                }
                break;
            
            case 'Hike':
                sportName = 'Carrera';
                break;

            case 'Walk':
                sportName = 'Carrera';
                break;

            case 'WeightTraining':
                sportName = 'Fuerza';
                break;

            case 'Workout':
                sportName = 'Fuerza';
                break;

            case 'Swim':
                sportName = 'Nado piscina';
                break;

            case 'Windsurf':
                sportName = 'Windsurf';
                break;

            default:
                if (isIndoorSession) {
                    sportName = 'Ciclo';
                } else {
                    sportName = 'Ciclismo crta';
                }
                break;
      }

    return sportName;
  }

  private mapSpot(sessionToImport) {    
    return sessionToImport.spotName ? sessionToImport.spotName : undefined;
  }
};

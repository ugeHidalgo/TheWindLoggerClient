import { Observable } from 'rxjs';
import { Session } from 'src/app/models/session';
import { ImportFieldTools } from './import-fieldTools';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { GlobalsService } from 'src/app/globals/globals.service';
import { Sport } from 'src/app/models/sport';
import { SportsService } from 'src/app/services/sports/sports.service';

export class ImportStravaSessionsHelper {
    private importFielTools: ImportFieldTools;
    private fieldNames: string[];
    private sports: Sport[];

  constructor(
    private sessionsService: SessionsService,
    private globals: GlobalsService,
    private sportsService: SportsService
  ) {
    const me = this;

    me.importFielTools = new ImportFieldTools();
    me.globals.maskScreen();
    me.sportsService.getSports(me.globals.userNameLogged)
        .subscribe(sports => {
            me.sports = sports;
            me.globals.unMaskScreen();
        },
        error => {
            me.globals.unMaskScreen();
        });
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
        session.sessionTime = sessionToImport.movingTime;
        session.sessionDistance = sessionToImport.distance/1000;
        session.sport = me.mapSport(sessionToImport.type, sessionToImport.trainer);
        session.spot = undefined;
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
      const me = this;
      var sport: Sport;

      switch (stravaSportType) {          
            case 'Run':
                if (isIndoorSession) {
                    sport = me.getSportByName('Carrera cinta');
                } else {
                    sport = me.getSportByName('Carrera');
                }
                break;
            
            case 'Hike':
                sport = me.getSportByName('Carrera');
                break;

            case 'Walk':
                sport = me.getSportByName('Carrera');
                break;

            case 'WeightTraining':
                sport = me.getSportByName('Fuerza');
                break;

            case 'Workout':
                sport = me.getSportByName('Fuerza');
                break;

            case 'Swim':                
                sport = me.getSportByName('Nado piscina');
                break;

            case 'Windsurf':
                sport = me.getSportByName('Windsurf');
                break;

            default:
                if (isIndoorSession) {
                    sport = me.getSportByName('Ciclo');
                } else {
                    sport = me.getSportByName('Ciclismo crta');
                }
                break;
      }

    return sport;
  }

  getSportByName(name: string): Sport {
    return this.sports.find( function(x) { return x.name === name; });
  }
};

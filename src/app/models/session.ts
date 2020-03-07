import { Sport } from './sport';
import { Spot } from './spot';

export class Session {
    _id: string;
    userName: string;
    name: string;
    description: string;
    sessionDate: Date;
    sessionTime: Number;
    sessionDistance: Number;
    sport: Sport;
    sportName: String;
    spot: Spot;
    spotName: String;
    active : boolean;
    created :  Date;
    updated :  Date;
}
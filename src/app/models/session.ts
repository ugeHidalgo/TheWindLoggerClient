import { Sport } from './sport';
import { Spot } from './spot';

export class Session {
    _id: string;
    userName: string;
    name: string;
    description: string;
    sessionDate: Date;
    sessionTime: number;
    sessionDistance: Number;
    sport: Sport;
    sportName: String;
    spot: Spot;
    spotName: String;
    race: boolean;
    indoor: boolean;
    value: Number;
    effort: Number;
    maxSpeed: Number;
    medSpeed: number;
    maxPower: Number;
    medPower: Number
    active : boolean;
    created :  Date;
    updated :  Date;
}
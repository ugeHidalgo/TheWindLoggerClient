import { Sport } from './sport';
import { Spot } from './spot';
import { SessionMaterial } from './sessionMaterial';

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
    materialsUsed: SessionMaterial[];
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
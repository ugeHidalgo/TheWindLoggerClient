import { Sport } from './sport';

export class SessionsInfoForSport {
    _id: string;
    userName: string;
    sport: Sport[];
    sessions: number;
    distance: number;
    time: number;
    maxSpeed: number;
    medSpeed: number;
    maxDistance: number;
    medDistance: number;
    maxPower: number;
    medPower: number;
    maxTime: number;
    medTime: number;
}
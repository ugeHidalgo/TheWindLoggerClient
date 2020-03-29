import { SessionsInfoForSport } from './sessionsInfoForSport';

export class SessionsInfo {
    _id: string;
    userName: string;
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
    sessionsInfoForSport: SessionsInfoForSport[];
}
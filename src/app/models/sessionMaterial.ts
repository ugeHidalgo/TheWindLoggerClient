import { Session } from './session';
import { Material } from './material';

export class SessionMaterial {
    _id : String;
    userName: String;
    session: Session;
    material: Material;
    time: number;
    distance: number;
    usePercentage: number;
    maxSpeed: number;
    created :  Date;
    updated :  Date;
}
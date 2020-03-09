import { Session } from './session';
import { Material } from './material';

export class SessionMaterial {
    _id : String;
    userName: String;
    session: Session;
    material: Material;
    time: Number;
    distance: Number;
    usePercentage: Number;
    maxSpeed: Number;
    created :  Date;
    updated :  Date;
}
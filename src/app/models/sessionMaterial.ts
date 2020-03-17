import { Session } from './session';
import { Material } from './material';

export class SessionMaterial {
    _id : String;
    userName: String;
    session: String;
    material: Material;
    materialName: String;
    materialTypeName: String;
    time: number;
    distance: number;
    usePercentage: number;
    maxSpeed: number;
    created :  Date;
    updated :  Date;
}
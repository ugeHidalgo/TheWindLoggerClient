import { SportType } from './sportType';

export class Sport {
    _id: string;
    userName: string;
    name: String;
    description: String;
    sportType: SportType;
    sportTypeName: String;
    active : boolean;
    created :  Date;
    updated :  Date;
  }
import { MaterialType } from './materialType';

export class Material {
    _id: string;
    userName: string;
    name: string;
    description: String;
    materialType: MaterialType;
    active : boolean;
    created :  Date;
    updated :  Date;
  }
import { MaterialType } from './materialType';

export class Material {
    _id: string;
    userName: string;
    name: string;
    description: String;
    materialType: MaterialType;
    brand: String;
    model: String;
    year: String;
    size: String;
    secondHand : Boolean;
    purchaseDate : Date;
    purchasePrice: Number;
    purchaseFrom: String;
    saleDate : Date;
    salePrice: Number;
    soldTo: String;
    comments: String;
    active : boolean;
    created :  Date;
    updated :  Date;
  }
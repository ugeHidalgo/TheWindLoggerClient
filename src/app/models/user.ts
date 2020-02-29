export class User {
  _id: string;
  userName: string;
  company: string;
  password: string;
  salt: String;
  firstName: String;
  lastName: String;
  eMail: String;
  active : boolean;
  admin: boolean;
  created :  Date;
  updated :  Date;
}
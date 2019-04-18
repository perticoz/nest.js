import * as crypto from 'crypto';

export class User {

  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean = true;
}

import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class UserServiceA {
    constructor(
        private userServ: UserService,
    ) {}

    findByEmail(email: string): User {
        return this.userServ.findByEmail(email);
    }

    create(user: User): any {
        return this.userServ.create(user);
    }

}

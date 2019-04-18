import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.model';
import { UserDto } from './userDto';
import { Observable, of } from 'rxjs';


@Injectable()
export class UserService {
    private readonly users: User[] = [{id: 1, name: 'florent', password: 'pwd', email: 'florent@gmail.com', active: true}];
    private readonly logger = new Logger(UserService.name);

    create(user: User): Observable<UserDto> {
        user.id = this.users.length + 1;
        user.active = true;
        let userCreated: UserDto;
        this.users.push(user);
        this.logger.log(`User id ${user.id} ${user.name} created `)
        userCreated = {name: this.users[this.users.length - 1].name};

        return of (userCreated);
    }

    findAll(): User[] {
        // tslint:disable-next-line:prefer-const
        let usersActifs: User [] = [];
        this.users.forEach(element => {
            if (element.active === true) { usersActifs.push(element); }
        });
        this.logger.log('All user retreived');
        return usersActifs;
    }

    findOne(id: string): User {
        const user = this.users[parseInt(id, 10) - 1];
        this.logger.log(`User id ${id} retreived`);
        return user.active === false ? null : user;
    }

    findByEmail(email: string): User {
        let user: User = null;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                user = this.users[i];
                break;
            }
        }

        return (  user === null || user.active === false) ? null : user;
    }

    remove(id: string): string {
        this.users[parseInt(id, 10) - 1].active = false;
        return (`User ${id} supprimé`);
    }

    update(id: string,  user: User): string {
        let index: number = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === parseInt(id, 10)) {
                index = i;
                break;
            }
        }
        if (this.users[index].active === true) {
            this.users[index].name = user.name;
            this.users[index].password = user.password;
        }

        return (this.users[index].active === false ? `User inexistant` : ` User ${id} updated` );
    }
}
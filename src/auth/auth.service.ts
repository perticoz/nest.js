import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from './user.entity';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

     async validate(email): Promise<User> {
        this.logger.log('validate userdata : ' + email);
        return await this.userService.findByEmail(email);
    }

    public async login(user: User): Promise< any | { status: number }>{
        return this.validate(user.email).then((userData)=>{
          if(!userData){
            return { status: 404 };
          }
          const payload = `${userData.email}`;
          const accessToken = this.jwtService.sign(payload);

          this.logger.log('login payload : ' + payload);

          return {
             expires_in: 3600,
             access_token: accessToken,
             user_id: payload,
             status: 201,
          };

        });
    }

     public async register(user: User): Promise<any>{
        return this.userService.create(user);
    }
}
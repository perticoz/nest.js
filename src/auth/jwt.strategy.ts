import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

    private readonly logger = new Logger(JwtStrategy.name);
    
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret12356789',
    });
  }

  async validate(payload) {
    const user = await this.authService.validate(payload);

    this.logger.log ('validate payload : ' + payload);
    this.logger.log ('validate user :' + user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.register({
        secretOrPrivateKey: 'secret12356789',
    })
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, PassportModule],
})
export class AuthModule { }

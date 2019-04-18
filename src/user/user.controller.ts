import { Controller, Get,  Post,  Header, Param, Delete, Put,
     Body, Logger, UseGuards } from '@nestjs/common';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { AuthGuard, PassportStrategy  } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';


@Controller('user')
export class UserController {

    private readonly logger = new Logger(UserController.name);

    constructor( private readonly userService: UserService) {}

    @Post()
    create(@Body() user: User): Observable<any> {
    user.id = 0;
    this.logger.log('creating user...');
    return of(this.userService.create(user)) ;
    }
    @Get('all')
    @UseGuards(AuthGuard('jwt'))
    findAll(): Observable<User[]> {
        this.logger.log('getting all user');
        return of(this.userService.findAll());
        }
    @Get(':id')
    findOne(@Param('id') id: string): Observable<User> {
        this.logger.log(`getting  user ${id}`);
        return of(this.userService.findOne(id));
    }
    @Delete(':id')
    remove(@Param('id') id: string): Observable<any> {
        return of(this.userService.remove(id));
    }
    @Put(':id')
    update(@Param('id') id: string, @Body()user: User): Observable<any> {
        return of(this.userService.update(id, user));
    }
}

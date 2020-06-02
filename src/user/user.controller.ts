import { UserEntity } from './user.entity';
import { LogInResponse } from './dto/user.type';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { GetUser } from './decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/registration')
    async signUp(@Body() user: UserDto): Promise<LogInResponse> {
        return await this.userService.sigUp(user);
    }

    @Post('/auth')
    async signIn(@Body() user: UserDto): Promise<LogInResponse> {
        return await this.userService.signIn(user);
    }

    @Get('/whoami')
    @UseGuards(AuthGuard())
    async whoAmI(@GetUser() user: UserEntity): Promise<LogInResponse> {
        return { username: user.username }
    }
}

import { LogInResponse } from './dto/user.type';
import { JwtPayload } from './../shared/app.types';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async sigUp(user: UserDto): Promise<LogInResponse> {
        const { username } = await this.userRepository.signUp(user);
        const accessToken = await this.generateToken(username);
        
        return { username, accessToken };
    }

    async signIn(user: UserDto): Promise<LogInResponse> {
        const username = await this.userRepository.validateUserPassword(user);
        const accessToken = await this.generateToken(username);

        return {
            username,
            accessToken
        }
    }

    async generateToken(username: string) {
        const payload: JwtPayload = { username };

        return await this.jwtService.sign(payload);
    }
}

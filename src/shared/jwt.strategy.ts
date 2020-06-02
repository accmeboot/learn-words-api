import 'dotenv/config';
import { UserRepository } from '../user/user.repository';;
import { JwtPayload } from './app.types';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY || 'secret'
        })
    }

    async validate({ username }: JwtPayload) {
        const user = await this.userRepository.findOne({ username });
        
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}

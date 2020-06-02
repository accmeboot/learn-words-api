import { getError } from './../shared/get-error.helper';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async signUp({ username, password }: UserDto): Promise<UserEntity> {
        const user = new UserEntity();

        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);

        try {
            await user.save();

            return user;
        } catch(error) {
            throw new HttpException(
                getError(error, 'username', ['User already eists']),
                HttpStatus.CONFLICT);
        }
    }

    async validateUserPassword({ username, password }: UserDto): Promise<string> {
        const user = await this.findOne({ username });
        
        if (!user) {
            throw new HttpException(
                getError(null, 'username', ['Username is incorrect']),
                HttpStatus.BAD_REQUEST
            )
        }

        if (await user?.validatePassword(password)) {
            return user.username;
        }

        throw new HttpException(
            getError(null, 'password', ['Password is incorrect']),
            HttpStatus.BAD_REQUEST
        )
    }
}

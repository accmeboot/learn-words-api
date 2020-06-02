import { JwtStrategy } from './../shared/jwt.strategy';
import 'dotenv/config';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret',
      signOptions: {
        expiresIn: process.env.EXPIRES_IN || 3600
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy
  ],
  exports: [
    JwtModule,
    PassportModule
  ]
})
export class UserModule {}

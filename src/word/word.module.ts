import { UserModule } from './../user/user.module';
import { WordRepository } from './word.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WordRepository]),
    UserModule
  ],
  providers: [WordService],
  controllers: [WordController],
  exports: [
    TypeOrmModule
  ]
})
export class WordModule {}

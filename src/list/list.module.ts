import { WordRepository } from './../word/word.repository';
import { WordModule } from './../word/word.module';
import { ListRepository } from './list.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListRepository]),
    UserModule,
    WordModule
  ],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}

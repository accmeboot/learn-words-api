import { DeletedEntity } from './../shared/app.types';
import { UserEntity } from './../user/user.entity';
import { WordEntity } from './word.entity';
import { AddWordDto } from './dto/add-word.dto';
import { WordService } from './word.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, UseGuards, Post, Body, Get, Param, Query, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { GetUser } from 'src/user/decorators/get-user.decorator';

@Controller('word')
@UseGuards(AuthGuard())
export class WordController {
    constructor(private wordService: WordService) {}

    @Post()
    async createWord(
        @Body() word: AddWordDto,
        @GetUser() user: UserEntity
    ): Promise<WordEntity> {
        return await this.wordService.createWord(word, user);
    }

    @Get()
    async getWords(@Query('substring') substring: string ): Promise<WordEntity[]> {
        return await this.wordService.getWords(substring);
    }

    @Put('/:id')
    async updateWord(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() word: AddWordDto
    ): Promise<WordEntity> {
        return await this.wordService.updateWord(id, word);
    }

    @Delete('/:id')
    async deleteWordById(@Param('id', ParseUUIDPipe) id: string): Promise<DeletedEntity> {
        return await this.wordService.deleteWord(id);
    }
}

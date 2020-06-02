import { DeletedEntity } from './../shared/app.types';
import { getError } from './../shared/get-error.helper';
import { UserEntity } from './../user/user.entity';
import { WordEntity } from './word.entity';
import { AddWordDto } from './dto/add-word.dto';
import { WordRepository } from './word.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WordService {
    constructor(
        @InjectRepository(WordRepository)
        private wordRepository: WordRepository
    ) {}

    async createWord(word: AddWordDto, user: UserEntity): Promise<WordEntity> {
        return await this.wordRepository.createWord(word, user);
    }

    async getWords(substring: string): Promise<WordEntity[]> {
        return await this.wordRepository.getWords(substring);
    }

    async deleteWord(id: string): Promise<DeletedEntity> {
        const { affected } = await this.wordRepository.delete(id);

        if (!affected) {
            throw new HttpException(
                getError(null, 'id', [`The word's: "${id}" not found`]),
                HttpStatus.NOT_FOUND
            )
        }

        return { deleted: true };
    }

    async updateWord(id: string, word: AddWordDto): Promise<WordEntity> {
        return await this.wordRepository.save({...word, id});
    }
}

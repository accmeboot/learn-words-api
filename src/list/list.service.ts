import { DeletedEntity } from './../shared/app.types';
import { getError } from './../shared/get-error.helper';
import { ListEntity } from './list.entity';
import { UserEntity } from './../user/user.entity';
import { ListRepository } from './list.repository';
import { WordRepository } from './../word/word.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ListService {

    constructor(
        @InjectRepository(WordRepository)
        private wordRepository: WordRepository,
        @InjectRepository(ListRepository)
        private listRepository: ListRepository
    ) {}
    
    async createList(list: CreateListDto, user: UserEntity): Promise<ListEntity> {
        const words = await this.wordRepository.findByIds(list.words);

        return await this.listRepository.createList(list, words, user);
    }

    async getLists(group: string, user: UserEntity): Promise<ListEntity[]> {
        return await this.listRepository.getLists(group, user);
    }

    async deleteList(id: string): Promise<DeletedEntity> {
        const { affected } = await this.listRepository.delete(id);

        if (!affected) {
            throw new HttpException(
                getError(null, 'id', [`The list's: "${id}" not found`]),
                HttpStatus.NOT_FOUND
            )
        }

        return { deleted: true };
    }

    async getListById(id: string, user: UserEntity): Promise<ListEntity> {
        const list = await this.listRepository.findOne({
            where: {
                id,
                authorId: user.id
            }
        });

        if (!list) {
            throw new HttpException(
                getError(null, 'user', [`The list: "${id}" doesn't exist or belongs you`]),
                HttpStatus.NOT_FOUND
            )
        }

        return list;
    }

    async addWordToListById(id: string, wordId: string): Promise<ListEntity> {
        const word = await this.wordRepository.findOne({
            where: { id: wordId }
        });

        if (!word) {
            throw new HttpException(
                getError(null, 'wordId', [`The word ${wordId} not found`]),
                HttpStatus.CONFLICT
            );
        }

        return await this.listRepository.addWordToListById(id, word);
    }

    async deleteWordFromListById(id: string, wordId: string): Promise<ListEntity> {
        const word = await this.wordRepository.findOne({
            where: { id: wordId }
        });

        if (!word) {
            throw new HttpException(
                getError(null, 'wordId', [`The word ${wordId} not found`]),
                HttpStatus.CONFLICT
            );
        }

        return await this.listRepository.deleteWordFromListById(id, word);
    }
}

import { UserEntity } from './../user/user.entity';
import { getError } from './../shared/get-error.helper';
import { HttpException, HttpStatus } from '@nestjs/common';
import { WordEntity } from './../word/word.entity';
import { CreateListDto } from './dto/create-list.dto';
import { ListEntity } from './list.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(ListEntity)
export class ListRepository extends Repository<ListEntity> {

    async createList(
        {
            name,
            group
        }: CreateListDto, 
        words: WordEntity[],
        user: UserEntity
    ): Promise<ListEntity> {
        const list = new ListEntity();

        list.name = name;
        list.group = group;
        list.author = user;
        list.words = words;

        try {
            await list.save();
            delete list.author;

            return list;
        } catch (error) {
            throw new HttpException(
                getError(error, 'name', [`The list ${name} already exists`]),
                HttpStatus.CONFLICT
            );
        }
    }

    async getLists(group: string, { id }: UserEntity): Promise<ListEntity[]> {
        const query = this.createQueryBuilder('list');

        query.andWhere('list.authorId = :id', { id });

        if (group) {
            query.andWhere('list.group LIKE :group', { group: `%${group}` })
        }

        query.leftJoinAndSelect('list.words', 'word');
        
        return query.getMany();
    }

    async deleteWordFromListById(id: string, incomingWord: WordEntity): Promise<ListEntity> {
        const list = await this.findOne({ where: { id } });

        if (!list) {
            throw new HttpException(
                getError(null, 'list', [`The list ${id} not found`]),
                HttpStatus.CONFLICT
            );
        }

        list.words = list.words.filter((word) => word.id !== incomingWord.id);
        
        await list.save();

        return list;
    }

    async addWordToListById(id: string, incomingWord: WordEntity): Promise<ListEntity> {
        const list = await this.findOne({ where: { id } });

        if (!list) {
            throw new HttpException(
                getError(null, 'list', [`The list ${id} not found`]),
                HttpStatus.CONFLICT
            );
        }

        list.words = [...list.words, incomingWord];
        
        await list.save();

        return list;
    }

    async updateList(oldList: ListEntity, newList: CreateListDto, words: WordEntity[]): Promise<ListEntity> {
        oldList.name = newList.name;
        oldList.group = newList.group;
        oldList.words = words;

        oldList.save();

        return oldList;
    }
}

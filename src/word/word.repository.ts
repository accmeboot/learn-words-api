import { UserEntity } from './../user/user.entity';
import { getError } from './../shared/get-error.helper';
import { HttpException, HttpStatus } from '@nestjs/common';
import { WordEntity } from './word.entity';
import { Repository, EntityRepository, Like } from 'typeorm';
import { AddWordDto } from './dto/add-word.dto';

@EntityRepository(WordEntity)
export class WordRepository extends Repository<WordEntity> {
    
    async createWord(
    {
        name,
        definition,
        examples,
        translations
    }: AddWordDto,
    user: UserEntity
    ): Promise<WordEntity> {
        const word = new WordEntity();

        word.name = name;
        word.definition = definition;
        word.examples = examples || [];
        word.translations = translations || [];
        word.author = user;

        try {
            await word.save();
            
            delete word.author;

            return word;
        } catch(error) {
            throw new HttpException(
                getError(error, 'name', [`The word "${name}" already eists`]),
                HttpStatus.CONFLICT);
        }
    }

    async getWords(substring: string): Promise<WordEntity[]> {
        const query = this.createQueryBuilder('word');

        if (substring) {
            query.andWhere('word.name LIKE :substring', { substring: `%${substring}%` });
        }

        return await query.getMany();
    }
}

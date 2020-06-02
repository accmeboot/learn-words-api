import { ListEntity } from './../list/list.entity';
import { UserEntity } from './../user/user.entity';
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToOne,
    ManyToMany
} from 'typeorm';

@Entity()
@Unique(['name'])
export class WordEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    definition: string;

    @Column('text', { array: true })
    examples: string[];

    @Column('text', { array: true })
    translations: string[];

    @ManyToOne(type => UserEntity, user => user.words, { eager: false })
    author: UserEntity;

    @ManyToMany(type => ListEntity)
    lists: ListEntity[];

    @Column()
    authorId: number;
}

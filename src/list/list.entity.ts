import { WordEntity } from './../word/word.entity';
import { UserEntity } from './../user/user.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany, JoinTable, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class ListEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()   
    name: string;

    @Column()
    group: string;

    @ManyToMany(type => WordEntity, word => word.lists, {
        cascade: true
    })
    @JoinTable()
    words: WordEntity[];

    @ManyToOne(type => UserEntity, user => user.lists, { eager: false })
    author: UserEntity;

    @Column()
    authorId: string;
}

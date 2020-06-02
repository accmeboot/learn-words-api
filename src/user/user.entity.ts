import { ListEntity } from './../list/list.entity';
import { WordEntity } from './../word/word.entity';
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()    
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => WordEntity, word => word.author, { eager: true })
    words: WordEntity[]

    @OneToMany(type => ListEntity, list => list.author, { eager: true })
    lists: ListEntity[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}

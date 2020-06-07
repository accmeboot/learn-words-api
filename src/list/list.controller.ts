import { DeletedEntity } from './../shared/app.types';
import { ListEntity } from './list.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './../user/user.entity';
import { CreateListDto } from './dto/create-list.dto';
import { ListService } from './list.service';
import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Query,
    Delete,
    Param,
    Patch,
    Put
} from '@nestjs/common';
import { GetUser } from 'src/user/decorators/get-user.decorator';

@Controller('list')
@UseGuards(AuthGuard())
export class ListController {

    constructor(
        private listService: ListService
    ) {}

    @Post()
    async createList(
        @Body() list: CreateListDto,
        @GetUser() user: UserEntity
    ): Promise<ListEntity> {
        return await this.listService.createList(list, user);
    }

    @Get()
    async getLists(
        @Query('group') group: string,
        @GetUser() user: UserEntity
    ): Promise<ListEntity[]> {
        return await this.listService.getLists(group, user);
    }

    @Put('/:id')
    async updateList(
        @Body() list: CreateListDto,
        @Param('id') id: string,
        @GetUser() user: UserEntity
    ): Promise<ListEntity> {
        return await this.listService.updateList(list, id, user);
    }

    @Patch('/:id')
    async addWordToListById(
        @Param('id') id: string,
        @Body('wordId') wordId: string
    ) {
        return await this.listService.addWordToListById(id, wordId);
    }

    @Patch('/:id/word')
    async deleteWordFromListById(
        @Param('id') id: string,
        @Body('wordId') wordId: string
    ) {
        return await this.listService.deleteWordFromListById(id, wordId);
    }

    @Get('/:id')
    async getListById(
        @Param('id') id: string,
        @GetUser() user: UserEntity
    ): Promise<ListEntity> {
        return await this.listService.getListById(id, user);
    }

    @Delete('/:id')
    async deleteList(@Param('id') id: string): Promise<DeletedEntity> {
        return await this.listService.deleteList(id);
    }
}

import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user_dto';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update_user_dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UserDecorator } from './users.decorator';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService
    ) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.create(createUserDto)
    }

    @Get()
    findAll(
        @Query("page", new DefaultValuePipe(1), ParseIntPipe)
        page: number = 1,
        @Query("limit", new DefaultValuePipe(100), ParseIntPipe)
        limit: number = 100,
    ): Promise<Pagination<UserEntity>> {
        limit = limit > 100 ? 100 : limit
        const options = {
            page, 
            limit
        }
        return this.userService.paginate(options)
    }

    // @Get(":id")
    // findOne(
    //     @Param(
    //         "id", 
    //         new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
    //     ) id: number
    // ): Promise<UserEntity> {
    //     return this.userService.findOne(id)
    // }

    @Put(":id")
    update(
        @Param(
            "id",
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        ) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UpdateResult> {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(":id")
    delete(
        @Param(
            "id", 
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        ) id: number
    ): Promise<DeleteResult> {
        return this.userService.delete(id)
    }


    @Get("test_custom_decorator/:id")
    findOne(
        @UserDecorator()
        user: UserEntity
    ) {
        console.log(user);
        return user
    }
}

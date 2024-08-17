import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user_dto';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update_user_dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}
    
    create(userDTO: CreateUserDto): Promise<UserEntity> {
        const user = new UserEntity()
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.email = userDTO.email;
        user.password = userDTO.password;

        return this.usersRepository.save(user)
    }

    paginate(option: IPaginationOptions): Promise<Pagination<UserEntity>> {
        const queryBuilder = this.usersRepository.createQueryBuilder("c")
        queryBuilder.orderBy("c.id", "DESC")
        return paginate<UserEntity>(queryBuilder, option)
    }

    findOne(id: number) {
        return this.usersRepository.findOneBy({ id })
    }

    update(id: number, userDTO: UpdateUserDto): Promise<UpdateResult> {
        return this.usersRepository.update(id, userDTO)
    }

    delete(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id)
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user_dto';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update_user_dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import * as bcrypt from "bcryptjs"
import { LoginDTO } from 'src/auth/dto/login.dto';
import { v4 as uuid4 } from "uuid"

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async create(userDTO: CreateUserDto): Promise<UserEntity> {

        // برای apiKey
        const user = new UserEntity()
        user.firstName = userDTO.firstName
        user.lastName = userDTO.lastName
        user.email = userDTO.email
        user.apiKey = uuid4()


        const salt = await bcrypt.genSalt()
        userDTO.password = await bcrypt.hash(userDTO.password, salt)
        user.password = userDTO.password

        // بعدر از اضافه کردن uuid به این کد تغییر کرد
        const savedUser = await this.usersRepository.save(user)
        delete savedUser.password
        return savedUser

        // اول این بود
        // const user = await this.usersRepository.save(userDTO)
        // delete user.password
        // return user
    }

    async findOne(data: LoginDTO): Promise<UserEntity> {
        const user = await this.usersRepository.findOneBy({email: data.email})
        if (!user) throw new UnauthorizedException("user not found")
        return user
    }

    paginate(option: IPaginationOptions): Promise<Pagination<UserEntity>> {
        const queryBuilder = this.usersRepository.createQueryBuilder("c")
        queryBuilder.orderBy("c.id", "DESC")
        return paginate<UserEntity>(queryBuilder, option)
    }

    update(id: number, userDTO: UpdateUserDto): Promise<UpdateResult> {
        return this.usersRepository.update(id, userDTO)
    }

    delete(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id)
    }

    async findById(id: number): Promise<UserEntity> {
        return this.usersRepository.findOneBy({ id })
    }

    async updateSecreteKey(userId, secret: string): Promise<UpdateResult> {
        return this.usersRepository.update(
            {id: userId},
            {
                twoFASecrete: secret,
                enable2FA: true
            }
        )
    }

    async disable2FA(userId: number): Promise<UpdateResult> {
        return this.usersRepository.update(
            { id: userId},
            {
                enable2FA: false,
                twoFASecrete: null
            }
        )
    }

    async findByApiKey(apiKey: string): Promise<UserEntity> {
        return this.usersRepository.findOneBy({ apiKey })
    }
}

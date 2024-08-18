import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create_user_dto';
import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity> 
    ) {}

    async create(userDTO: CreateUserDto): Promise<UserEntity> {
        const salt = await bcrypt.genSalt()
        userDTO.password = await bcrypt.hash(userDTO.password, salt)
        const user = await this.userRepository.save(userDTO)
        delete user.password
        return user
    }
}

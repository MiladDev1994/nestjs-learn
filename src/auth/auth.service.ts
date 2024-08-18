import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create_user_dto';
import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs"
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
        const user = await this.userService.findOne(loginDTO)
        const passwordMatched = await bcrypt.compare(loginDTO.password, user.password)
        if (passwordMatched) {
            delete user.password;
            const payload = {email: user.email, sub: user.id}
            return {accessToken: this.jwtService.sign(payload)}
        } else throw new UnauthorizedException("password dose not match")
    }
}

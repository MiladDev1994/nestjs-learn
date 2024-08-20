import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create_user_dto';
import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs"
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { payloadTypes } from './types';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private userService: UsersService,
        private jwtService: JwtService,
        private artistService: ArtistsService
    ) {}

    async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
        const user = await this.userService.findOne(loginDTO)
        const passwordMatched = await bcrypt.compare(loginDTO.password, user.password)
        if (passwordMatched) {
            delete user.password;
            const payload: payloadTypes = {email: user.email, userId: user.id}
            const artist = await this.artistService.findArtList(user.id)
            if (artist) payload.artistId = artist.id
            return {accessToken: this.jwtService.sign(payload)}
        } else throw new UnauthorizedException("password dose not match")
    }
}

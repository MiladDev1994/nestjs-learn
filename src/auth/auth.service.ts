import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create_user_dto';
import { UserEntity } from 'src/users/users.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from "bcryptjs"
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FAType, payloadTypes } from './types';
import * as speakeasy from "speakeasy"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private userService: UsersService,
        private jwtService: JwtService,
        private artistService: ArtistsService,
        private configService: ConfigService
    ) {}

    async login(loginDTO: LoginDTO): Promise<{ accessToken: string } | {validate2FA: string, message: string}> {
        const user = await this.userService.findOne(loginDTO)
        const passwordMatched = await bcrypt.compare(loginDTO.password, user.password)
        if (passwordMatched) {
            delete user.password;
            const payload: payloadTypes = {email: user.email, userId: user.id}
            if (user.enable2FA && user.twoFASecrete) {
                return {
                    validate2FA: "http://localhost:3000/auth/validate-2fa",
                    message: "please enter otp"
                }
            }
            const artist = await this.artistService.findArtList(user.id)
            if (artist) payload.artistId = artist.id
            return {accessToken: this.jwtService.sign(payload)}
        } else throw new UnauthorizedException("password dose not match")
    }

    async enable2FA(userId: number): Promise<Enable2FAType> {
        const user = await this.userService.findById(userId)
        if (user.enable2FA) {
            return {secrete: user.twoFASecrete};
        }
        const secrete = speakeasy.generateSecret()
        user.twoFASecrete = secrete.base32;
        await this.userService.updateSecreteKey(user.id, user.twoFASecrete)
        return {secrete: user.twoFASecrete};
    }

    async validate2FAToken(userId: number, token: string): Promise<{ verified: boolean }> {
        try {
            const user = await this.userService.findById(userId)

            const verified = speakeasy.totp.verify({
                secret: user.twoFASecrete,
                token,
                encoding: "base32"
            })

            if (verified) {
                return {verified: true}
            } else {
                return {verified: false}
            }
        } catch (error) {
            throw new UnauthorizedException("error verified token")
        }
    }

    async disable2FA(userId: number): Promise<UpdateResult> {
        return this.userService.disable2FA(userId)
    }

    async validateUserByApiKey(apiKey: string): Promise<UserEntity> {
        return this.userService.findByApiKey(apiKey)
    }

    getEnvVariable() {
        return this.configService.get<number>("dbName")
    }
}

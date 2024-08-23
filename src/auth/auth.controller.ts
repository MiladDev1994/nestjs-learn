import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create_user_dto';
import { UserEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService
    ){}

    @Post("signup")
    signup(
        @Body()
        userDTO: CreateUserDto
    ): Promise<UserEntity> {
        return this.userService.create(userDTO)
    }

    @Post("login")
    login(
        @Body()
        loginDTO: LoginDTO,
    ) {
        return this.authService.login(loginDTO)
    }

    @Get("enable-2fa")
    @UseGuards(JwtAuthGuard)
    enable2FA(
        @Request()
        request
    ): Promise<Enable2FAType> {
        // console.log(request);
        return this.authService.enable2FA(request.user.userId)
    }

    @Post("validate-2fa")
    @UseGuards(JwtAuthGuard)
    validate2FA(
        @Request()
        request,
        @Body()
        validateTokenDTO: ValidateTokenDTO
    ): Promise<{ verified: boolean }> {
        return this.authService.validate2FAToken(
            request.user.userId,
            validateTokenDTO.token
        )
    }

    @Get("disable-2fa")
    @UseGuards(JwtAuthGuard)
    disable2FA(
        @Request()
        request
    ): Promise<UpdateResult> {
        return this.authService.disable2FA(request.user.userId)
    }


    @Get("profile")
    @UseGuards(AuthGuard("bearer"))
    getProfile(
        @Request()
        request
    ) {
        delete request.user.password;
        return {
            msg: "authenticated with apiKey",
            user: request.user
        }
    }

}

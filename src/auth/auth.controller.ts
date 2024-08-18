import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create_user_dto';
import { UserEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';

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
}

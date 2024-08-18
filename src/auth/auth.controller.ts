import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create_user_dto';
import { UserEntity } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("signup")
    signup(
        @Body()
        userDTO: CreateUserDto
    ): Promise<UserEntity> {
        return this.authService.create(userDTO)
    }
}

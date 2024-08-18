import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
    secret: authConstants.secret, 
    signOptions: {
      expiresIn: "1d"
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}




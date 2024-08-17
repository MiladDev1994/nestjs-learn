import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    
    @IsString()
    @Optional()
    firstName: string;

    @IsString()
    @Optional()
    lastName: string;

    @IsEmail()
    @Optional()
    email: string;

    @IsString()
    @Optional()
    password: string;

}
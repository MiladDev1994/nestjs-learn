import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDto {

    @IsString({message: "باید رشته باشد"})
    @IsOptional()
    readonly title;

    
    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true}) // المان اول برای اضافه کردن یه سری آپشنه مثل allowNaN و allowInfinity
        // المان دوم مشخص میکنه که تمام آیتم های این آرایه باید این ویژگی رو داشته باشن
    readonly artists;
    
    @IsString()
    @IsDateString()
    readonly releasedDate;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration;

    @IsString()
    @IsOptional()
    readonly lyrics;

}
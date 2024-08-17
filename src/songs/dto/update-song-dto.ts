import { IsArray, IsDateString, IsMilitaryTime, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDto {

    @IsString({message: "باید رشته باشد"})
    @IsOptional()
    readonly title;

    
    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true}) // المان اول برای اضافه کردن یه سری آپشنه مثل allowNaN و allowInfinity
        // المان دوم مشخص میکنه که تمام آیتم های این آرایه باید این ویژگی رو داشته باشن
    readonly artists;
    
    @IsDateString()
    @IsOptional()
    readonly releasedDate;

    @IsMilitaryTime()
    @IsOptional()
    readonly duration;

    @IsString()
    @IsOptional()
    readonly lyrics;

}
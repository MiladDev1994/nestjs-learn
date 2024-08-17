import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { SongEntity } from './songs.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller({
    path: "songs",
    scope: Scope.REQUEST 
        // وقتی تو کنتلرل یا سرویس از scopes استفاده کینم یه اتفاق جالب میوفته
        // تمام این کلاس ها سینگلتون هستن و مقادیر رو تو خودشون نگهمیدارن
        // به همین دلیل امنیت رو کاهش میدن چون فقط همین یه دونه کلاس رو داریم و اطلاعات داخلضون میتونه در دسترس همه قرار بگیره
        // نست برای حل این مشکل یه آپشت در اختیار نا نیذاره و اون هم استفاده از scpes هستش
        // سه تا مقدار رو میپذیره
        // DEFAULT => برای حالت دیفالت هستش که هون رفتاریکه گفتم رو داره یعنی از یه کلاس استفاده میکنه
        // REQUEST => در این حالت برای هر رکوئست میاد یه کپی از اون کلاس میگیره و بعد از انجام کارش اون کلاس رو پاک میکنه تا همه اطلاعات یه جا تحکیع نشه
        // TRANSIENT => تفاوت این رو با REQUEST نمیدونم ولی رفتارش شبیه همونه
})
export class SongsController {
    constructor(
        private songsService: SongsService,
    ) {}

    @Post()
    create(@Body() createSongDto: CreateSongDto): Promise<SongEntity> {
        return this.songsService.create(createSongDto)
    }

    @Get()
    findAll(
        @Query("page", new DefaultValuePipe(1), ParseIntPipe)
        page: number = 1,
        @Query("limit", new DefaultValuePipe(100), ParseIntPipe)
        limit: number = 100,
    ): Promise<Pagination<SongEntity>> {
        limit = limit > 100 ? 100 : limit
        const options = {
            page, 
            limit
        }
        return this.songsService.paginate(options)


        // try {
        //     return this.songsService.findAll()
        // } catch (error) {
        //     throw new HttpException("bad request", HttpStatus.BAD_REQUEST, {
        //         cause: error.message
        //     })
        // }
    }

    @Get(":id")
    findOne(
        @Param(
            "id",
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        )  // از این روش برای دلیدیشن ئکوریتور های مربوط به رکوئست استفاده میشه
        // الان اینجا من بهش گفتم که پارامس رو به عدد تبدیل کن و اگر رشته بهش بدن ارور برمیگردونه
        id: number
    ): Promise<SongEntity> {
        return this.songsService.findOne(id)
    }

    @Delete(":id")
    delete(
        @Param(
            "id",
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        ) id: number): Promise<DeleteResult> {
        return this.songsService.delete(id)
    }

    @Put(":id")
    update(
        @Param(
            "id",
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        ) id: number,
        @Body() recordToUpdate: UpdateSongDto
    ): Promise<UpdateResult> {
            return this.songsService.update(id, recordToUpdate)
    }
}

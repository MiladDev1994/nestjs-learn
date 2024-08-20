// ایجاد کردن رول برای کاربران

    // تو یاین آموزش یه اتفاق عجیب افتاده که هب نظر من اصلا نیازی به این کار نبوده
    // ما یه تیبل برای یوزرها داریم و یه تیبل دیگه داریم که ریلیشن داره با یوزر به اسم آرتیست
    // و اومده برای اینکه مشخص کنه کدوم یوزر آرتیسته تو تیبل آرتیست آیدی یوزر رو داده با آرتیست
    // یعنی تر زده
    // حالا ما با انی بخشش کار نداریم



// برای شروع  اول یه ماژول برای آرتیست میسازیم با اطلاعات زیر

    // @Module({
    // imports: [TypeOrmModule.forFeature([ArtistEntity])], // برای ارتباط با دیتابیس
    // controllers: [ArtistsController],
    // providers: [ArtistsService],
    // exports: [ArtistsService] // برای اینکه بتونه تو ماژول auth بهش دسترسی داشته باشه
    // })
    // export class ArtistsModule {}





// بعد برای این آرتیست یه سرویس هم ساخته با اطلاعات زیر

    // @Injectable()
    // export class ArtistsService {
    //     constructor(
    //         @InjectRepository(ArtistEntity)
    //         private artistRepo: Repository<ArtistEntity> // برای ارتباط با انتیتی یا همون مدل مربوط به آرتیست
    //     ) {}

            // این فانکشن هم برای گرفتن یوزر از دیتابیسه ولی چون یوزر با آرتیست ریلیشن داره از تو تیبل آرتیست اومده یوزر رو گرفته
    //     findArtList(userId: number): Promise<ArtistEntity> {
    //         return this.artistRepo.findOneBy({user: {id: userId}})
    //     }
    // }




// در ادامه یه کلاس جالب دارم که کارش چک کردن یوزر هستش و اینکه آیا به اون بخش دسترسی داره یا نه
// برای این کلاس یه فایل با اسم artists_jwt_quard.ts کنار ماژول auth ایجاد میکنیم
// جالبه که اونجا اضافه کرده
// فعلا خیلی درکش نمیکنم بعدا بیشتر درموردش میخونم

    // import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
    // import { AuthGuard } from "@nestjs/passport";
    // import { Observable } from "rxjs";

    // @Injectable()
    // export class ArtistsJwtGuard extends AuthGuard("jwt") {
    //     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //         return super.canActivate(context)
    //     }
        
    //     handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    //         if (err || !user) throw err || new UnauthorizedException()
    //         console.log(user);
    //         if (user.artistId) return user // اینجا چک میکنه که آیا یوزر آرتیست هم هست یا نه و اگر نبود ارور بر میگردونه
    //         throw err || new UnauthorizedException() 
    //     }
    // }





// حالا برای اینکه به اطلاعات آرتیست تو ماژول auth دسترسی داشته باشم ماژول آرتیست تو وارد میکنیم
    // @Module({
    //     imports: [
    //     TypeOrmModule.forFeature([UserEntity]), 
    //     JwtModule.register({
    //         secret: authConstants.secret, 
    //         signOptions: {
    //         expiresIn: "1d"
    //         }
    //     }),
    //     ArtistsModule // اینجا
    //     ],
    // })




// بعد تو سرویس مربوط به auth
// همونجایی که لاگین میکنیم چک میکنیم ببینیم کاربر آرتیست هم هست یا نه


    // constructor(
    //     @InjectRepository(UserEntity)
    //     private userRepository: Repository<UserEntity>,
    //     private userService: UsersService,
    //     private jwtService: JwtService,
    //     private artistService: ArtistsService // برای دسترسی به اطلاعات آرتیست
    // ) {}

    // async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    //     const user = await this.userService.findOne(loginDTO)
    //     const passwordMatched = await bcrypt.compare(loginDTO.password, user.password)
    //     if (passwordMatched) {
    //         delete user.password;
    //         const payload: payloadTypes = {email: user.email, userId: user.id}
    //         const artist = await this.artistService.findArtList(user.id) // چک کردن آرتیست بودن یوزر
    //         if (artist) payload.artistId = artist.id
    //         return {accessToken: this.jwtService.sign(payload)}
    //     } else throw new UnauthorizedException("password dose not match")
    // }




// یه بخشی هم قبلا توسعه داده بودیم به اسم jwt.strategy.ts
// اونجا به اطلعات یوزر دسترسی داریم و میتونیم بهش بگیم که آرتیست بودن یا نبودن رو برامون مشخص کنه

    // async validate(payload: payloadTypes) {
    //     return {
    //         userId: payload.userId, 
    //         email: payload.email, 
    //         artistId: payload.artistId // اینجا
    //     }
    // }



// حالا وقتش زسیده که از این کدهایی که تا الان نوشتیمم استفاده کنیم
// برای تست میریم به قسمت ایجاد کردن song
// با استفاده ار دکوریتور @UseGuard() و دادن مقدار اون کلاسی که برای مشخص کردن سطح دسترسی اون کاربر بود، بهش میگیم که فقط کاربری که آرتیست باشه میتونه song جدید ایحاد کنه
// با استفاده از دکوریتور @Request() هم میتونیم اطلاعات داخل رکوئست رو بگیریم و نمایش بدیم

    // @Post()
    // @UseGuards(ArtistsJwtGuard)
    // create(
    //     @Body() createSongDto: CreateSongDto,
    //     @Request() request,
    // ): Promise<SongEntity> {
    //     console.log(request.user);
    //     return this.songsService.create(createSongDto)
    // }


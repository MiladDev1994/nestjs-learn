// مثل همه زبان های برنامه نویسی و فریموورک ها برای ساخت جداول و ارتباط با آنها باید مدل ایجاد کنیم
// مدل ها رو در نست با اسم انتیتی میشناسیم
// این فایل کنار ماژول قرار میگیره
// بعد از ساخت انتیتی باید بدیمش به کلید انتیتی که در قسمت ارتباط با دیتابیس وجود داره

// این انتیتی رو باید به ماژول اصلی که دیتابیس برای اون ساخته شده هم بشناسونیم
    // @Module({
    //     imports: [TypeOrmModule.forFeature([SongEntity])],
    //     providers: [SongsService],
    //     controllers: [SongsController]
    // })


// و باید به سرویس هم اضافه بشه
    // export class SongsService {
        // constructor(
        //     @InjectRepository(SongEntity)
        //     private songsRepository: Repository<SongEntity>
        // ){}
    // }


// حالا برای اینزرت کردن دیتا در دیتابیس که توسط فایل سرویس انجام میشه از این روش اسفاده میکنیم
    // async create (songDTO: CreateSongDto): Promise<SongEntity> {
    //     const song = new SongEntity()
    //     let {title, artists, duration, lyrics, releasedDate} = song
    //     let {title: titleDto, artists: artistsDTO, duration: durationDTO, lyrics: lyricsDTO, releasedDate: releasedDateDTO} = songDTO
    //     title = titleDto
    //     artists = artistsDTO
    //     duration = durationDTO
    //     lyrics = lyricsDTO
    //     releasedDate = releasedDateDTO

    //     return await this.songsRepository.save(song)
    // }

    
    
// و همچنین باید تایپ فانکشن اینزرت در کنترلر هم مشخص کنیم
    // @Post()
    // create(@Body() createSongDto: CreateSongDto): Promise<SongEntity> {
    //     return this.songsService.create(createSongDto)
    // }


// برای بقیه متد ها هم به پروژه مراجعه شود
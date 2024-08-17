// برای ایجاد ارتباط OneToOne
// این ارتباط یک طرفست و فقط کافیه تو یه دونه از انتیتی ها قرار بگیره

    // تو فایل انتیتی
        // @OneToOne(() => UserEntity) // مدلی که قراره باهاش ارتباط داشته باشه
        // @JoinColumn() // برای جوین شدن دوتا ستون
        // user: UserEntity; // برای اسم کلید


    // تو فایل ماژول
    // فعلا شک دارم نیاز باشه یا نه
        // @Module({
        //     imports: [TypeOrmModule.forFeature([SongEntity])], مدلی که قراره باهاش ارتباط داشته باشه
        // })




// برای ارتباط ManyToMany
// باید تو هر دوتا انتیتی قرار بگیره

    // انتیتی اولی songs
        // @ManyToMany(() => ArtistEntity, (artist) => artist.songs, {cascade: true}) // از cascade برای ایجاد ارتباط پویا بین جداول استفاده میشه. یعنی به تغییرات حساس میشه و به صورت خودکار اعمال میکنمه
        // @JoinTable({name: "songs_artists"}) // اسم فشذمث رابط
        // artists: ArtistEntity[]  برای اسم کلید

    // ماژول اولی songs
        // @Module({
        //     imports: [TypeOrmModule.forFeature([SongEntity, ArtistEntity])],
        //     providers: [SongsService],
        //     controllers: [SongsController]
        // })

    // سرویس اولی songs
            // constructor(
            //     @InjectRepository(SongEntity)
            //     private songsRepository: Repository<SongEntity>,
                        // برای اونی که قراره بهش متصل بشه
            //     @InjectRepository(ArtistEntity)
            //     private artistsRepository: Repository<ArtistEntity>
            // ){}

            // async create (songDTO: CreateSongDto): Promise<SongEntity> {
            //     const song = new SongEntity()
            //     song.title = songDTO.title
            //     song.artists = songDTO.artists
            //     song.duration = songDTO.duration
            //     song.lyrics = songDTO.lyrics
            //     song.releasedDate = songDTO.releasedDate

            //     // for ManyToMany
            //     const artists = await this.artistsRepository.findByIds(song.artists)
            //     song.artists = artists

            //     return await this.songsRepository.save(song)
            // }

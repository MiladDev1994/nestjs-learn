// برای ایجاد صفحه بندی از ابزار زیر استفاده میکنیم
// nestjs-typeorm-paginate



// برای استفاده در متد گت اینجوری باید عمل کنیم

    // توی کنترلر
        // @Get()
        // findAll(
        //     @Query("page", new DefaultValuePipe(1), ParseIntPipe)
        //     page: number = 1,
        //     @Query("limit", new DefaultValuePipe(1), ParseIntPipe)
        //     limit: number = 100,
        // ): Promise<Pagination<SongEntity>> {
        //     limit = limit > 100 ? 100 : limit
        //     const options = {
        //         page, 
        //         limit
        //     }
        //     return this.songsService.paginate(options)
        // }

    // توی سرویس
        // async paginate(option: IPaginationOptions): Promise<Pagination<SongEntity>> {

        //     بدون سورت
        //     return paginate<SongEntity>(this.songsRepository, option)

        //     اگر بخوایم اطلاعات رو سورت کنیم
        //     const queryBuilder = this.songsRepository.createQueryBuilder("c")
        //     queryBuilder.orderBy("c.releasedDate", "DESC")
        //     return paginate<SongEntity>(queryBuilder, option)

        // }
    

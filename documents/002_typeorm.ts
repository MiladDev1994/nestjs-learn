// برای استفاده از typeorm در نست باید ابتدا سه تا پکیج رو نصب کنیم
    // @types/node
    // @nestjs/typeorm
    // pg
    // typeorm

// برای اتصال به دیتابیس باید کد زیر را به مدل اضافه کنیم
    // @Module({
    //     imports: [
        //     TypeOrmModule.forRoot({
        //         type: "postgres",
        //         host: "localhost",
        //         port: 5432,
        //         username: "postgres",
        //         password: "5913",
        //         database: "nest_document",
        //         entities: [],
        //         synchronize: true
        //     }),
    //     ],
    // })


// و داخل کلاس هم میتونیم ارتباط رو چک کنیم 
    // constructor(private dataSource: DataSource) {
    // console.log(dataSource.driver.database);
    // }
    
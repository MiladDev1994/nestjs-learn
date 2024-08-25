import { Inject, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlaylistModule } from './playlists/playlists.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from "./config/configuration"
// import { dataSourceOption } from 'db/data-source';
import { typeOrmAsyncConfig } from 'db/data-source';
import { validate } from 'env.validation';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.production"],
      isGlobal: true,
      load: [configuration],
      validate: validate
    }),
    // TypeOrmModule.forRoot(dataSourceOption),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    ArtistsModule,
    UsersModule,
    AuthModule,
    PlaylistModule,
    SeedModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

// برای ویدلویر باید ماژول رو از نست ماژول ایمپلیمنت کنیم
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    // console.log(dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes("songs") // برای تمام متد های این روت
      // .forRoutes({path: "songs", method: RequestMethod.POST}) // فقط برای متد پست
      .forRoutes(SongsController) // فقط برای کنترلر SongsController
    
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// هر سرویسی که ساخته میشه باید با ماژول هم اضافه بشه
// حالا ما روش های مختلفی برای اینکار داریم که بررسی میکنیم

    // 1) روش اول همون روش معمولیه که سرویس به ماژول اضافه میشه

        // @Module({
        //   providers: [AppService],
        // })


    // 2) روش دوم با استفاده از useClass انجام میشه

        // @Module({
        //   providers: {
          // provide:  AppService,
          // useClass:  AppService,
        // },
        // })


    // 3) روش سوم استفاده از useValue هستش
      //  که میایم به صورت دستی برای سرویسمون متغییر تعریف میکنیم که این متغییر باید همون فانکشنی رو داشته باشه که سرویس داره استفاده میکنه

      // const mockSongService = {
      //   findAll() {
      //     return ({id: 1, title: "testy"})
      //   }
      // }
      

      // @Module({
      //   providers: {
        // provide:  AppService,
        // useValue:  mockSongService,
      // },
      // })



      // 4) روش چهرام هم استفاده از useValue هستش
        // برای این کار یک دایرکتوری به اسم constants در فولدر common ایجاد میکنیم
        // و فایل گانکشن رو اونجا میذاریم به همراه نمونه کد زیر _ connection.ts

            // export const connection: Connection = {
            //   CONNECTION_STRING: "CONNECTION_STRING",
            //   DB: "MYSQL",
            //   DBNAME: "TEST"
            // }

            // export type Connection = {
            //   CONNECTION_STRING: string,
            //   DB: string,
            //   DBNAME: string,
            // }


        // و در فایل ماژول

            // @Module({
            //   providers: {
              // provide:  "CONNECTION",
              // useValue:  connection,
            // },
            // })


        // ور فایل سرویس هم این کد
          // به جای فایل سرویس میتونیم تو فایل کنترلر هم قرارش بدیم
                        
            // @Injectable()
            // export class SongsService {
            //   constructor(
            //     @Inject("CONNECTION")
            //     connection: Connection
            //   )
            // }

        // 5) روش پنجم باز هم استفاده از useCalss هستش
          // برای اینکار تو فولدر common یه مسیر به اسن providers ایحاد میکنیم
          // و فایل موردنظر رو میسازیم مصلا DevConfigService.ts _ به همراه قطعه کد زیر
                        
              // @Injectable()
              // export class DevConfigService {
                // DBHOST = "localhost"
                // getDBHOST() {
                //   return this.DBHOST
                // }
              // }


          // و در فایل ماژول

              // @Module({
              //   providers: {
                // provide:  DevConfigService,
                // useValue:  DevConfigService,
              // },
              // })


          // و در فایل سرویس
              
              // @Injectable()
              // export class SongsService {
              //   constructor(
              //     private devConfigService: DevConfigService
              //   ){}
                // getHello(): string {
                //   return `run : ${this.devConfigService.getDBHOST()}`
                // }
              // }


          // 6) روش شش استفاده از userFactory


            // و در فایل ماژول

                // @Module({
                //   providers: {
                  // provide:  CONFIG,
                  // userFactory:  () => {
                    // return process.env.NODE_ENV === "development" ? "run on port 3000" : "run on port 4000"
                  // },
                // },
                // })


          // و در فایل سرویس
              
              // @Injectable()
              // export class SongsService {
              //   constructor(
                  // @Inject("CONFIG")
              //     private config: any data
              //   ){
              //      console.log(config)
                // }
              // }

              
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


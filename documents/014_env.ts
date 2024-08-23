// این بخش درمورد استفاده از متغییرهای محیطی هستش

// در روت پروژه دوتا فایل با اسم 
    // .env.development
        // NODE_ENV=development اینو میذاریم داخلش

    // .env.production
        // NODE_ENV=production اینو میذاریم داخلش





// میتونیم برای این فایل ها ولیدیشن هم داشته باشیم
// برای اینکار یه فایل با اسم env.validation.ts کنار همین فایل ها ایجاد میکنیم و کدهای زیر رو کنارش مینویسیم
    // import { plainToInstance } from "class-transformer";
    // import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";

    // enum Environment {
    //     Development = 'development',
    //     Production = 'production',
    //     Test = 'test',
    //     Provision = 'provision',
    // }

    // class EnvironmentVariables {

    //     @IsEnum(Environment)
    //     NODE_ENV: Environment

    //     @IsNumber()
    //     PORT: number;

    //     @IsNumber()
    //     DB_PORT: number;

    //     @IsString()
    //     DB_HOST: string;
        
    //     @IsString()
    //     USERNAME: string;
        
    //     @IsString()
    //     PASSWORD: string;
        
    //     @IsString()
    //     DB_NAME: string;
        
    //     @IsString()
    //     SECRET: string;
    // }

    // export function validate(config: Record<string, unknown>) {
    //     // console.log("config ", config);
    //     const validateConfig = plainToInstance(EnvironmentVariables, config, {
    //         enableImplicitConversion: true
    //     })
    //     // console.log(validateConfig);

    //     const errors = validateSync(validateConfig, {
    //         skipMissingProperties: false
    //     })

    //     if (errors.length > 0) {
    //         // console.log(errors);
    //     }
    //     return validateConfig
    // }







// یه فایل کانفیگ هم لازم داریم که همه این اطلاعات رو از اونجا بخونیم
// برای اینکار یه فولدر به اسم config در فولدر src ایجاد میکنیم و فایل configuration.ts رو داخلش ایجاد میکنیم
// به همراه کد زیر
    // export default () => ({
    //     port: parseInt(process.env.PORT),
    //     secret: process.env.SECRET,
    //     dbHost: process.env.DB_HOST,
    //     dbPort: parseInt(process.env.DB_PORT),
    //     usernames: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     dbName: process.env.DB_NAME
    // })








// تو فایل app.module.ts یه سری کد جدید باید ایمپورت بشه و یه سری هم تغییر کنه

    // import { ConfigModule } from '@nestjs/config';
    // import { typeOrmAsyncConfig } from 'db/data-source';
    // import { validate } from 'env.validation';
    // import configuration from "./config/configuration"

    // @Module({
    //     imports: [
    //         ConfigModule.forRoot({
    //             envFilePath: [".env.development", ".env.production"],
    //             isGlobal: true,
    //             load: [configuration],
    //             validate: validate
    //         }),
    //         // TypeOrmModule.forRoot(dataSourceOption), مقدار قبلی
    //         TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    //     ]
    // })






// حالا میتونیم پورت برنامه هم از فایل .env بگیریم
// برای اینکار این کد رو میذاریم داخل فایل main.ts

    // async function bootstrap() {
    //     const app = await NestFactory.create(AppModule);
    //     app.useGlobalPipes(new ValidationPipe())
    // // برای اجرا شدن دستورات مربوط به seeder
    //     // const seedService = app.get(SeedService)
    //     // await seedService.seed()
    
    //     // برای env
    //     const configService = app.get(ConfigService)
    //     await app.listen(configService.get<number>("port"));
    // }
    // bootstrap();
  





    


// یه تغییری هم تو فایل auth.module.ts داریم

    // مقدار اولیه
    // JwtModule.register({
    //   secret: authConstants.secret, 
    //   signOptions: {
    //     expiresIn: "1d"
    //   }
    // }),

    // به این تغییر کرد
    // JwtModule.registerAsync({
    //     imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) => ({
    //         secret: configService.get<string>("secret"),
    //         signOptions: {
    //         expiresIn: "1d"
    //         }
    //     }),
    //     inject: [ConfigService]
    // }),







// و در انتها باید فایل data-source.ts رو که برای ایجاد ارتباط به دیتابیس بود رو تغییر بدیم تا همه اطلاعاتش رو از متغییر محیطی بخونه
    
// import { ConfigModule, ConfigService } from "@nestjs/config";
    // import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
    // import { DataSource, DataSourceOptions } from "typeorm";

    // export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     useFactory: async (
    //         configService: ConfigService
    //     ): Promise<TypeOrmModuleOptions> => {
    //         return {
    //             type: "postgres",
    //             host: configService.get<string>("dbHost"),
    //             port: configService.get<number>("dbPort"),
    //             username: configService.get<string>("usernames"),
    //             password: configService.get<string>("password"),
    //             database: configService.get<string>("dbName"),
    //             // entities: [SongEntity, UserEntity, ArtistEntity],
    //             entities: ["dist/**/*.entity.js"],
    //             synchronize: false,
    //             migrations: ["dist/db/migrations/*.js"]
    //         }
    //     }
    // }

    // export const dataSourceOption: DataSourceOptions = {
    //     type: "postgres",
    //     host: process.env.DB_HOST,
    //     port: parseInt(process.env.DB_PORT),
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME,
    //     // entities: [SongEntity, UserEntity, ArtistEntity],
    //     entities: ["dist/**/*.entity.js"],
    //     synchronize: false,
    //     migrations: ["dist/db/migrations/*.js"]
    // }


    // // اول ابن بور
    // // export const dataSourceOption: DataSourceOptions = {
    // //     type: "postgres",
    // //     host: "localhost",
    // //     port: 5432,
    // //     username: "postgres",
    // //     password: "5913",
    // //     database: "nest_doc",
    // //     // entities: [SongEntity, UserEntity, ArtistEntity],
    // //     entities: ["dist/**/*.entity.js"],
    // //     synchronize: false,
    // //     migrations: ["dist/db/migrations/*.js"]
    // // }

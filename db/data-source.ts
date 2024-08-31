import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService
    ): Promise<TypeOrmModuleOptions> => {
        return {
            // type: "postgres",
            // host: configService.get<string>("dbHost"),
            // port: configService.get<number>("dbPort"),
            // username: configService.get<string>("usernames"),
            // password: configService.get<string>("password"),
            // database: configService.get<string>("dbName"),
            // // entities: [SongEntity, UserEntity, ArtistEntity],
            // entities: ["dist/**/*.entity.js"],
            // synchronize: false,
            // migrations: ["dist/db/migrations/*.js"]

            // type: 'sqlite',
            // database: 'db/database.db', 
            // keepConnectionAlive: true,
            // entities: ["dist/**/*.entity.js"],
            // migrations: ["dist/db/migrations/*.js"],
            // synchronize: true,
            // logging: false,



            type: "postgres",
            // url: 'postgresql://root:FVaQnapmSl5YKsUEaOmTfD9p@nest-db:5432/postgres',
            host: "nanaga-parbat.liara.cloud",
            port: 33747,
            username: "root",
            password: "FVaQnapmSl5YKsUEaOmTfD9p",
            database: "postgres",
            // entities: [SongEntity, UserEntity, ArtistEntity],
            entities: ["dist/**/*.entity.js"],
            synchronize: false,
            migrations: ["dist/db/migrations/*.js"] 
        }
    }
}

export const dataSourceOption: DataSourceOptions = {
    // type: "postgres",
    // host: process.env.DB_HOST,
    // port: parseInt(process.env.DB_PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // // entities: [SongEntity, UserEntity, ArtistEntity],
    // entities: ["dist/**/*.entity.js"],
    // synchronize: false,
    // migrations: ["dist/db/migrations/*.js"]
    
    type: "postgres",
    // url: 'postgresql://root:FVaQnapmSl5YKsUEaOmTfD9p@nest-db:5432/postgres',
    host: "nanaga-parbat.liara.cloud",
    port: 33747,
    username: "root",
    password: "FVaQnapmSl5YKsUEaOmTfD9p",
    database: "postgres",
    // entities: [SongEntity, UserEntity, ArtistEntity],
    entities: ["dist/**/*.entity.js"],
    synchronize: false,
    migrations: ["dist/db/migrations/*.js"] 
}


// اول ابن بور
// export const dataSourceOption: DataSourceOptions = {
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "5913",
//     database: "nest_doc",
//     // entities: [SongEntity, UserEntity, ArtistEntity],
//     entities: ["dist/**/*.entity.js"],
//     synchronize: false,
//     migrations: ["dist/db/migrations/*.js"]
// }

const dataSource = new DataSource(dataSourceOption)
export default dataSource

// برای ایجاد دیتا فیک در دیتابیس
    // @faker-js/faker





    
// برای اینزرت کردن اطلاعات در دیتابیس باید برای هر تیبل فانکشن مربوط به خودش رو داشته باشیم
// برای اینکار یه فایل با اسم data-seed.ts در فولدر دیتابیس میسازیم و کدهای زیر رو داخلش قرار میدیم
// این کدها نیاز به توضیح ندارن و با خوندنش میشه فهمید چیکار داره میکنه

    // import { faker } from "@faker-js/faker"
    // import * as bcrypt from "bcryptjs"
    // import { v4 as uuid4 } from "uuid"
    // import { UserEntity } from "src/users/users.entity"
    // import { PlaylistEntity } from "src/playlists/playlist.entity"
    // import { ArtistEntity } from "src/artists/artists.entity"
    // import { EntityManager } from "typeorm"

    // export const seedData = async (manager: EntityManager): Promise<void> => {

    //     await seedUser()
    //     await seedArtist()
    //     await seedPlaylists()

    //     async function seedUser () {
    //         const salt = await bcrypt.genSalt();
    //         const encryptedPassword = await bcrypt.hash("123456", salt);

    //         const user = new UserEntity();
    //         user.firstName = faker.person.firstName();
    //         user.lastName = faker.person.lastName();
    //         user.email = faker.internet.email();
    //         user.password = encryptedPassword;
    //         user.apiKey = uuid4();

    //         await manager.getRepository(UserEntity).save(user);
    //     }

    //     async function seedArtist () {
    //         const salt = await bcrypt.genSalt();
    //         const encryptedPassword = await bcrypt.hash("123456", salt);

    //         const user = new UserEntity();
    //         user.firstName = faker.person.firstName();
    //         user.lastName = faker.person.lastName();
    //         user.email = faker.internet.email();
    //         user.password = encryptedPassword;
    //         user.apiKey = uuid4();

    //         const artist = new ArtistEntity();
    //         artist.user = user;

    //         await manager.getRepository(UserEntity).save(user);
    //         await manager.getRepository(ArtistEntity).save(artist);
    //     }

    //     async function seedPlaylists () {
    //         const salt = await bcrypt.genSalt();
    //         const encryptedPassword = await bcrypt.hash("123456", salt);

    //         const user = new UserEntity();
    //         user.firstName = faker.person.firstName();
    //         user.lastName = faker.person.lastName();
    //         user.email = faker.internet.email();
    //         user.password = encryptedPassword;
    //         user.apiKey = uuid4();

    //         const playlist = new PlaylistEntity();
    //         playlist.name = faker.music.genre();
    //         playlist.user = user;

    //         await manager.getRepository(UserEntity).save(user);
    //         await manager.getRepository(PlaylistEntity).save(playlist);
    //     }
    // }








// باید یه ماژول و یه سرویس براش ایجاد کنیم

    // ماژول
        // import { Module } from '@nestjs/common';
        // import { SeedService } from './seed.service';

        // @Module({
        // providers: [SeedService]
        // })
        // export class SeedModule {}

    // سرویس
    // خیلی از اتفاقات داخل سرویس سر در نمیارم 
    // بعدا به موقعش کامل میخونمش
        // import { Injectable } from '@nestjs/common';
        // import { seedData } from 'db/seeds/data-seed';
        // import { DataSource } from 'typeorm';

        // @Injectable()
        // export class SeedService {

        //     constructor(
        //         private readonly connection: DataSource
        //     ) {}

        //     async seed(): Promise<void> {
        //         const queryRunner = this.connection.createQueryRunner();

        //         await queryRunner.connect()
        //         await queryRunner.startTransaction()

        //         try {
        //             const manager = queryRunner.manager;
        //             await seedData(manager)
        //             await queryRunner.commitTransaction()
        //         } catch (error) {
        //             console.log(`seeder error: ${error}`);
        //             await queryRunner.rollbackTransaction();
        //         } finally {
        //             await queryRunner.release()
        //         }

        //     }
        // }







    // برای اعمال شدن این تغییرات در دیتابیس باید این رو تو فایل main.ts مشخص کنیم

    // async function bootstrap() {
    //     const app = await NestFactory.create(AppModule);
    //     app.useGlobalPipes(new ValidationPipe())
    //   // برای اجرا شدن دستورات مربوط به seeder
    //     // const seedService = app.get(SeedService)
    //     // await seedService.seed()
    //     await app.listen(3000);
    // }
    // bootstrap();
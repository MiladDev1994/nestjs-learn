// مدیریت دیتابیس



// ابتدا ساخت فولدر db در روت پروژه و فایل data-source.ts داخلش به همراه کد زیر

    // import { DataSource, DataSourceOptions } from "typeorm";

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

    // const dataSource = new DataSource(dataSourceOption)
    // export default dataSource



// به جای اون ساختار قبلی که برای ارتباط با دیتابیس در ماژول اصلی داشتیم حالا این مقدار جدید رو وارد میکنیم

    // @Module({
    //     imports: [TypeOrmModule.forRoot(dataSourceOption)]
    // })



// اسکریپت هایی که باید به فایل package.json اضافه بشه
    // "typeorm": "npm run build && typeorm -d dist/db/data-source.js",
    // "migration:generate": "npm run typeorm -- migration:generate",
    // "migration:run": "npm run typeorm -- migration:run",
    // "migration:revert": "npm run typeorm -- migration:revert"




// حالا چه جوری باید با این کار کنیم
// خیلی ساده تر از چیزیه که به نظر میاد
// فقط کافیه هر تغییری که میخوای رو تو فایل های انتیتی اعمال کنیو دستور زیر رو اجرا کنی
// npm run migration:generate -- db/migrations/"file_name"
// بعد از اجرای این دستور typeorm میاد تمام فایل های انتیتی رو چک میکنه و هر تغییری که ببینه یه فایل با اسمی که مشخص کردیم تو مسیر مایگرسن ها ایجاد میکنه
// برای اعمال تغییرات هم کافیه دستور زیر رو اجرا کنیم
// npm run migration:run

// برای ساخت ساختار اولیه دیتابیس هم مثل دستور اول رفتار میکنیم
// یعنی وقتی که هنوز جدولی ساخته نشده دستور زیر رو اجرا میکنیم تا همه فایل های انتیتی رو بخونه و ساختار  جداول رو تشخیص بده و با اجرای دستور run همه جداول ساخته میشه
// npm run migration:generate -- db/migrations/"file_name"
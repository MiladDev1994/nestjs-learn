// نمیدونم برای چیه اصلا فقط مینویسم شاید یاد گرفتم
// احتمالا یه جور احراز حویت کارب با استفاده از از یه کد هش شدست
// فکر کنم اینو میفزستیم برای کاربر و برای انجام یه سری از کارها بتونه از این استفاده کنه
// مثلا تو سایت های خرید و فروش ارز دیجیتال خیلی کاربردیه

// با نصب ابزار uuid شروع میکنیم
// passport-http-bearer



// ابتدا یه ستون به تیبل یوزر اضافه میکنیم

    // @Column()
    // apiKey: string;




// مثل jwt باید یه استراتژی براش مشخص کنیم
// برای اینکار یه فایل با اسم api-key-strategy.ts تو ماژول auth ایجاد مکینیم به همراه کد زیر

    // import { Injectable, UnauthorizedException } from "@nestjs/common";
    // import { PassportStrategy } from "@nestjs/passport";
    // import { Strategy } from "passport-http-bearer"
    // import { AuthService } from "./auth.service";

    // @Injectable()
    // export class ApiKeyStrategy extends PassportStrategy(Strategy) {
    //     constructor(
    //         private authService: AuthService
    //     ) {
    //         super();
    //     }

    //     async validate(apiKey: string) {
    //         const user = await this.authService.validateUserByApiKey(apiKey)
    //         if(!user) {
    //             throw new UnauthorizedException()
    //         } else {
    //             return user
    //         }
    //     }

    // }




// یه سرویس هم برای دریافت یوزر باید ایحاد کنیم => auth.service.ts

    // async validateUserByApiKey(apiKey: string): Promise<UserEntity> {
    //     return this.userService.findByApiKey(apiKey)
    // }





// بعد این استراتژی ساخته شده رو به فایل ماژول اضافه مکینیم

    // providers: [AuthService, JwtStrategy, ApiKeyStrategy],


// حالا یه روت جدید تو کنترلر میسازیم برای تست این apiKey

    // @Get("profile")
    // @UseGuards(AuthGuard("bearer"))
    // getProfile(
    //     @Request()
    //     request
    // ) {
    //     delete request.user.password;
    //     return {
    //         msg: "authenticated with apiKey",
    //         user: request.user
    //     }
    // }





// برای اینزرت کردن این یوزر در دیتابیس یه تغییراتی هم باید به تابع مربوط به این کار بدیم => user.service.ts

    // async create(userDTO: CreateUserDto): Promise<UserEntity> {

    //     // برای apiKey
    //     const user = new UserEntity()
    //     user.firstName = userDTO.firstName
    //     user.lastName = userDTO.lastName
    //     user.email = userDTO.email
    //     user.apiKey = uuid4()


    //     const salt = await bcrypt.genSalt()
    //     userDTO.password = await bcrypt.hash(userDTO.password, salt)
    //     user.password = userDTO.password

    //     // بعدر از اضافه کردن uuid به این کد تغییر کرد
    //     const savedUser = await this.usersRepository.save(user)
    //     delete savedUser.password
    //     return savedUser

    //     // اول این بود
    //     // const user = await this.usersRepository.save(userDTO)
    //     // delete user.password
    //     // return user
    // }
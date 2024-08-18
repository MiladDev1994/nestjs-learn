// برای جنریت کردن توکن و احراز حویت کاربر از پکیج های زیر استفاده میکنیم
    // @nestjs/passport
    // passport
    // @nestjs/jwt
    // passport-jwt
    // @types/passport-jwt




// مقداری که باید در AuthModule import بشه

    // @Module({
        // imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
        //     secret: authConstants.secret, مقداری که به عنوان سالت برای دسترسی سخت تر به اطلاعات توکن اضافه میشه
        //     signOptions: {
        //       expiresIn: "10s"
        //     }
        // })], 
    // })




// برای سکرت کی میتونیم یه فایل جدا داشته باشیم
// برای اینکار در مسیر ماژول یه فایل با پسوند constants ایجاد میکنیم و مقدار سکرت رو اونجا تعریف میکنیم

    // export const authConstants = {
    //     secret: "HAD_12X"
    // }




// سروسیس مربوط به لاگین 
    // @Injectable()
    // export class AuthService {
    //     constructor(
    //         @InjectRepository(UserEntity)
    //         private userRepository: Repository<UserEntity>,
    //         private userService: UsersService,
    //         private jwtService: JwtService
    //     ) {}

    //     async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    //         const user = await this.userService.findOne(loginDTO)
    //         const passwordMatched = await bcrypt.compare(loginDTO.password, user.password)
    //         if (passwordMatched) {
    //             delete user.password;
    //             const payload = {email: user.email, sub: user.id}
    //             return {accessToken: this.jwtService.sign(payload)}
    //         } else throw new UnauthorizedException("password dose not match")
    //     }
    // }


// تا اینجا تونستیم یه توکن ایجاد کنیم. حالا بریم سراغ اعتبار سنجی توکن ایجاد شده

// فعلا خیلی با این ساختار آشنا نیسم اما سعی میکنم که شرح بدم

// ابتدا یک فایل به اسم jwt.strategy.ts کنار فایل ماژول میسازیم و کلاس زیر رو داخلش مینویسیم

    // @Injectable()
    // export class JwtStrategy extends PassportStrategy(Strategy) {
    //     constructor() {
    //         super({
    //             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), فکر کنم برای گرفتن توکن از هدر استفاده میشه
    //             ignoreExpiration: false,
    //             secretOrKey: authConstants.secret // سکرت کی رو برای مقایسه با سکرت کی توکن براش مشخص میکنه
    //         })
    //     }

    //     async validate(payload: any) {
    //         return {userId: payload.sub, email: payload.email}
    //     }
    // }


// حالا این کلاس رو باید به سرویس ماژول خودش اضافه کنیم

    // @Module({
    //     imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
    //     secret: authConstants.secret, 
    //     signOptions: {
    //         expiresIn: "10s"
    //     }
    //     })],
    //     controllers: [AuthController],
    //     providers: [AuthService, ****JwtStrategy****],
    //     exports: [AuthService]
    // })






// حالا یه فایل دیگه به اسم jwt-guard.ts کنار همین فایل ایجاد میکنیم و کلاس زیر رو داخلش ایجاد میکنیم

    // @Injectable()
    // export class JwtAuthGuard extends AuthGuard("jwt") {}



// حالا برای تست کردن این اعتبار سنجی یک روت ایجاد میکنیم

    // @Get("jwtTest")
    // @UseGuards(JwtAuthGuard)
    // jwtTest(
    //     @Req()
    //     request,
    // ): string {
    //     return request.user
    // }
// برای اعتبار سنجی کاربر از پکیج های زیر استفاده میکنیم

    // bcryptjs
    // @types/bcryptjs

// اعتباز سنجی کاربر از جله اون مواردی هستش که باید تو همه جای پروژه در دسترس باشه و چون کار درستی نیست که همهجا ایمپروت بشه پس به صورت گلوبال تعریفش میکنیم
    // برای تعریف کردن به صورت گلوبال باید از ماژول خودش اکسپورت بشه
    // و تو سرویسش قید بشه که گلوباله 
        //  @Global


// برای signup

    // کنترلر
        // @Controller('auth')
        // export class AuthController {
        //     constructor(private authService: AuthService){}

        //     @Post("signup") // یعنی مسیر auth/signup
        //     signup(
        //         @Body()
        //         userDTO: CreateUserDto
        //     ): Promise<UserEntity> {
        //         return this.authService.create(userDTO)
        //     }
        // }

    // سرویس
        // @Injectable()
        // export class AuthService {
        //     constructor(
        //         @InjectRepository(UserEntity)
        //         private userRepository: Repository<UserEntity> 
        //     ) {}

        //     async create(userDTO: CreateUserDto): Promise<UserEntity> {
        //         const salt = await bcrypt.genSalt()
        //         userDTO.password = await bcrypt.hash(userDTO.password, salt)
        //         const user = await this.userRepository.save(userDTO)
        //         delete user.password
        //         return user
        //     }
        // }








        // برای یونیک بودن ستون 
            // @Column({unique: true})

        // برای حذف ستون از ریسپانس اما کار نمیکنه
            // @Exclude()
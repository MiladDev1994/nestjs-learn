import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get("jwtTest")
  @UseGuards(JwtAuthGuard)
  jwtTest(
    @Req()
    request,
  ): string {
    return request.user
  }
}


// // ساختار ابتدایی کنترلر به این صورته
// @Controller("users") // به اینا میگن دکوریتور که مسیر های اینجا قرار میگیره
// export class AppController {
//   constructor(private readonly appService: AppService) {} // و سرمیس ها هم ایجا اسففاده میشن

//   @Get() // اینجا متد رو مشخص میکنیم
//   getHello(): string { // و این هم فانکشنی که در نهایت ریترن میشه و اسمش اصلا مهم نیستن
//     return this.appService.getHello();
//   }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// اگر مسیر داینامیک بود داخل متد مشخص میشه
// @get("/:id")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
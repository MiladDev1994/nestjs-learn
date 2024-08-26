import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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


  @Post("upload")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: "./upload/files",
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    }),
    limits: {
      fileSize: 10000000
    }
  }))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    console.log(file);
    return {
      data: file,
      message: "Uploaded"
    }
  }



  @Post("upload_mp3")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: "./upload/files",
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    }),
    limits: {
      fileSize: 10000000
    }
  }))
  uploadMp3File(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "mpeg"
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File
  ) {
    console.log(file);
    return {
      data: file,
      message: "Uploaded"
    }
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
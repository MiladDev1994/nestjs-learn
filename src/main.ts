import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
// برای اجرا شدن دستورات مربوط به seeder
  // const seedService = app.get(SeedService)
  // await seedService.seed()

  // برای env
  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>("port"));
}
bootstrap();

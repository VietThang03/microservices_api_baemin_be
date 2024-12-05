import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { JwtAuthGuard } from './auth-api/jwt-auth.guard';
import { JwtMiddleware } from './middleware/gateway';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.useStaticAssets(join(__dirname, '..', 'public'));
  //app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  //app.useGlobalInterceptors(new TransformInterceptor());
  app.setViewEngine('ejs');
  //cấu hình cookies
  app.use(cookieParser());
  //cấu hình cors
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  });
  // Đăng ký middleware
  app.use(new JwtMiddleware().use);
  //Áp dụng guard toàn cục
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  await app.listen(8080);
}
bootstrap();

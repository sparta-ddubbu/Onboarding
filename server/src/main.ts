import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { getCorsOptions } from './app.options';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Onboarding API')
    .setDescription('회원가입, 로그인 Flow')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  app.use(cookieParser());
  app.enableCors(getCorsOptions());

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();

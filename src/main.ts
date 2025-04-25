import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // class-transformer'ı da aktifleştirir
    }),
  );

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application is running for: ${process.env.NODE_ENV}`);
  console.log(`Application is running on PORT: ${process.env.PORT}`);
}

bootstrap();

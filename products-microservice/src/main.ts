import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const host = configService.get<string>('PRODUCTS_HOST');
  const port = configService.get<number>('PRODUCTS_PORT');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  );

  await app.listen();
  console.log(`Products Microservice ${port} portunda çalışıyor!`);
}
bootstrap();

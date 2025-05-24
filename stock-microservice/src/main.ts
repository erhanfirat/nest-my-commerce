import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { SERVICES } from '@ecommerce/types';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'orders',
          brokers: [`${SERVICES.KAFKA.host}:${SERVICES.KAFKA.port}`],
        },
        consumer: {
          groupId: 'stock-consumer',
        },
      },
    },
  );

  await app.listen();
}
bootstrap();

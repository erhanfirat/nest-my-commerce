import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SERVICES } from '@ecommerce/types';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'orders',
          brokers: [`${SERVICES.KAFKA.host}:${SERVICES.KAFKA.port}`],
        },
        consumer: {
          groupId: 'orders-consumer',
        },
      },
    },
  );

  await app.listen();
}
bootstrap();

import { SERVICES } from '@ecommerce/types';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class OrderKafkaProducerService implements OnModuleInit {
  private kafka = new Kafka({
    brokers: [`${SERVICES.KAFKA.host}:${SERVICES.KAFKA.port}`],
  });
  private producer = this.kafka.producer();

  async onModuleInit() {
    // module initialize olduğunda çalıştır!
    await this.producer.connect();
  }

  // emit > event fırlatmak, yayınlamak
  async emit(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}

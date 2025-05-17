import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class OrderProducerService implements OnModuleInit {
  private kafka = new Kafka({ brokers: ['kafka:9092'] });
  private producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async emit(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
import { Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

export abstract class BaseEntityWithName extends BaseEntity {
  @Column()
  name: string;
}

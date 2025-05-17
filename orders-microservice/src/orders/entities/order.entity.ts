import { Column, Entity, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { BaseEntity } from '@ecommerce/types';

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    onDelete: 'CASCADE',
  })
  items: OrderItem[];

  constructor(dto: Partial<Order>) {
    super();
    Object.assign(this, { ...dto });
  }
}

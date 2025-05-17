import { BaseEntity } from '@ecommerce/types';
import { Order } from './order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => Order, (order) => order.items, {
    eager: true,
    onDelete: 'CASCADE',
  })
  order: Order;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  constructor(dto: Partial<OrderItem>) {
    super();
    Object.assign(this, { ...dto });
  }
}

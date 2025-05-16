import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from './order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: 'CASCADE',
    eager: true,
  })
  product: Product;

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

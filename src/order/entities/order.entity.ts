import { BaseEntity } from 'src/common/entities/BaseEntity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    onDelete: 'CASCADE',
  })
  items: OrderItem[];

  constructor(dto: Partial<Order>) {
    super();
    Object.assign(this, { ...dto });
  }
}

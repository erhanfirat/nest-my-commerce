import { BaseEntityWithName } from 'src/common/entities/BaseEntityWithName';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';

@Entity('products')
export class Product extends BaseEntityWithName {
  @Column({ type: 'varchar', length: 255, unique: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @ManyToOne(() => User, (user) => user.productsSold, { onDelete: 'SET NULL' })
  seller: User;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  constructor(productDTO: Partial<Product>) {
    super();
    Object.assign(this, { ...productDTO });
  }
}

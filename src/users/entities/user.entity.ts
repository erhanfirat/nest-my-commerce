import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from '../utils/types';
import { BaseEntityWithName } from 'src/common/entities/BaseEntityWithName';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('users')
export class User extends BaseEntityWithName {
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, unique: false })
  password: string;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'timestamp', nullable: true })
  birthdate: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Product, (product) => product.seller)
  productsSold: Product[];

  constructor(userDTO: Partial<User>) {
    super();
    Object.assign(this, { ...userDTO });
  }
}

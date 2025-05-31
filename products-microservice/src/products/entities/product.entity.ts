import { Column, Entity, OneToMany } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { BaseEntityWithName } from '@ecommerce/types';

@Entity('products')
export class Product extends BaseEntityWithName {
  @Column({ type: 'varchar', length: 255, unique: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: 'seller_id', type: 'int', nullable: true })
  sellerId: number;

  @Column({ name: 'category', type: 'varchar', length: 255, nullable: true })
  category: string;

  constructor(productDTO: Partial<Product>) {
    super();
    Object.assign(this, { ...productDTO });
  }
}

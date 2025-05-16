import { Column, Entity } from 'typeorm';
import { BaseEntityWithName, UserRole } from '@ecommerce/types';

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

  constructor(userDTO: Partial<User>) {
    super();
    Object.assign(this, { ...userDTO });
  }
}

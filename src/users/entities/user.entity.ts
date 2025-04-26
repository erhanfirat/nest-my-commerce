import { Column, Entity } from 'typeorm';
import { UserRole } from '../../common/types/roles.enum';
import { BaseEntityWithName } from 'src/common/entities/baseEntityWithName';

@Entity()
export class User extends BaseEntityWithName {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}

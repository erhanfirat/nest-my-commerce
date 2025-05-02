export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  USER = 'USER',
  GUEST = 'GUEST',
}

export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  birthdate: string;
  isActive: boolean;
  role: UserRole;
  createdAt?: string;
};

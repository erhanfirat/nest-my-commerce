export enum UserRole {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  USER = 3,
  SELLER = 4,
  GUEST = 5,
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

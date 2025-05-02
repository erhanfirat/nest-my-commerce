export enum UserRole {
  SUPER_ADMIN,
  ADMIN,
  SELLER,
  USER,
  GUEST,
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

export type JwtPayload = {
  sub: number;
  email: string;
  role: UserRole;
};

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  USER = 'USER',
  GUEST = 'GUEST',
}

import { UserRole } from "../users/types/users";

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}

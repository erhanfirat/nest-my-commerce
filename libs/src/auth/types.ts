import { UserRole } from "../users/types/users";

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}

export const AUTH_PATTERNS = {
  LOGIN: "Auth.Login",
  ME: "Auth.Me",
  VERIFY: "Auth.Verify",
};

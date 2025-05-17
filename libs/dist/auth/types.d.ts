import { UserRole } from "../users/types/users";
export interface JwtPayload {
    sub: number;
    email: string;
    role: UserRole;
}
export declare const AUTH_PATTERNS: {
    LOGIN: string;
    ME: string;
    VERIFY: string;
};

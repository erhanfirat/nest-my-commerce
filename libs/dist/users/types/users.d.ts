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
export declare enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    USER = "USER",
    GUEST = "GUEST"
}
export declare const USER_PATTERNS: USER_PATTERNS_TYPE;
type USER_PATTERNS_TYPE = {
    CREATE: string;
    FIND_ALL: string;
    FIND_ONE: string;
    FIND_BY_EMAIL: string;
    UPDATE: string;
    REMOVE: string;
};
export {};

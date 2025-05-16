import { UserRole } from "../types/users";
export declare class UserResponseDto {
    id: number;
    name: string;
    email: string;
    birthdate: Date;
    role: UserRole;
    constructor(partial: Partial<UserResponseDto>);
}
export declare class UserDto extends UserResponseDto {
    password: string;
    constructor(partial: Partial<UserResponseDto>);
}

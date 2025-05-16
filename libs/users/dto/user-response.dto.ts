import { UserRole } from "../types/users";

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  role: UserRole;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

export class UserDto extends UserResponseDto {
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    super(partial);
  }
}

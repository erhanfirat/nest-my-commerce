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

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  USER = "USER",
  GUEST = "GUEST",
}

export const USER_PATTERNS: USER_PATTERNS_TYPE = {
  FIND_ALL: "Users.FindAll",
  FIND_ONE: "Users.FindOne",
  FIND_BY_EMAIL: "Users.FindByEmail",
  CREATE: "Users.Create",
  UPDATE: "Users.Update",
  REMOVE: "Users.Remove",
};

type USER_PATTERNS_TYPE = {
  CREATE: string;
  FIND_ALL: string;
  FIND_ONE: string;
  FIND_BY_EMAIL: string;
  UPDATE: string;
  REMOVE: string;
};

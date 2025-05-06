import { Request } from 'express';
import { UserResponseDto } from 'src/users/dto/user-response.dto'; // varsa bunu kullan, yoksa Partial<User> da olur

export interface RequestWithUser extends Request {
  user: UserResponseDto; // veya: Partial<User>
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  timestamp: string;
  data: T;
}

export interface ApiErrorResponse {
  success: boolean;
  timestamp: string;
  message: string;
}

export type SortOrder = 'ASC' | 'DESC';

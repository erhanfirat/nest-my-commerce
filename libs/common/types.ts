

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder;
}

export interface SearchablePaginationParams extends PaginationParams {
  search: string;
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

export type SortOrder = "ASC" | "DESC";

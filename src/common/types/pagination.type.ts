export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
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

export type SortOrder = 'asc' | 'desc';

export type PaginationOptions = {
  page: number;
  limit: number;
  sort: string;
  order: SortOrder;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
};

export type ApiResponse<T> = {
  success: boolean;
  timestamp: string;
  data: T;
};

export type ApiErrorResponse = {
  success: boolean;
  timestamp: string;
  message: string;
};

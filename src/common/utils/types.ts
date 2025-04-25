export type SortOrder = 'asc' | 'desc';

export type PaginationOptions = {
  page: number;
  limit: number;
  sort: string;
  order: SortOrder;
};

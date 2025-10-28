export interface PageResponse<T> {
    items: T[];
    totalCount: number;
    totalPages: number;
    page: number;
    pageSize: number;
}
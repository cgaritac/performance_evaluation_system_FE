export interface PageRequest {
    page: number;
    pageSize: number;
    searchTerm?: string;
    sortBy?: string;
    sortDirection?: string;
    year?: number;
    companyId?: number;
  }
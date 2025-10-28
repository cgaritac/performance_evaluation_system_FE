import { PageRequest } from "./page-request.interface";

class PageRequestModel implements PageRequest {
    public page: number;
    public pageSize: number;
    public searchTerm?: string;
    public sortBy?: string;
    public sortDirection?: string;
    public year?: number;
    public companyId?: number;

    private constructor(page: number, pageSize: number, searchTerm?: string, sortBy?: string, sortDirection?: string, year?: number, companyId?: number) {
        this.page = page;
        this.pageSize = pageSize;
        this.searchTerm = searchTerm;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
        this.year = year;
        this.companyId = companyId;
    }

    public static create({
        page = 1,
        pageSize = 10,
        searchTerm,
        sortBy,
        sortDirection,
        year,
        companyId,
      }: Partial<PageRequest>): PageRequestModel {
        return new PageRequestModel(
          page,
          pageSize,
          searchTerm,
          sortBy,
          sortDirection,
          year,
          companyId
        );
      }
    
      public toQueryString(): string {
        const params = new URLSearchParams();
    
        params.append("page", String(this.page));
        params.append("pageSize", String(this.pageSize));
    
        if (this.searchTerm) params.append("searchTerm", this.searchTerm);
        if (this.sortBy) params.append("sortBy", this.sortBy);
        if (this.sortDirection) params.append("sortDirection", this.sortDirection);
        if (this.year !== undefined) params.append("year", String(this.year));
        if (this.companyId !== undefined)
          params.append("companyId", String(this.companyId));
    
        return params.toString();
      }
}

export default PageRequestModel;
import { PageRequest } from "./page-request.interface";

class PageRequestModel implements PageRequest {
    public page: number;
    public pageSize: number;
    public searchTerm?: string;
    public sortBy?: string;
    public sortDirection?: string;
    public year?: number;
    public departmentId?: number;

    private constructor(page: number, pageSize: number, searchTerm?: string, sortBy?: string, sortDirection?: string, year?: number, departmentId?: number) {
        this.page = page;
        this.pageSize = pageSize;
        this.searchTerm = searchTerm;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
        this.year = year;
        this.departmentId = departmentId;
    }

    public static create({
        page = 1,
        pageSize = 10,
        searchTerm,
        sortBy,
        sortDirection,
        year,
        departmentId,
      }: Partial<PageRequest>): PageRequestModel {
        return new PageRequestModel(
          page,
          pageSize,
          searchTerm,
          sortBy,
          sortDirection,
          year,
          departmentId
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
        if (this.departmentId !== undefined)
          params.append("departmentId", String(this.departmentId));
    
        return params.toString();
      }
}

export default PageRequestModel;
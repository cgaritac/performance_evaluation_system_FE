import { PageResponse } from "./page-response.interface";

class PageResponseModel<T> implements PageResponse<T> {
    public items: T[];
    public totalCount: number;
    public totalPages: number;
    public page: number;
    public pageSize: number;

    private constructor(items: T[], totalCount: number, totalPages: number, page: number, pageSize: number) {
        this.items = items;
        this.totalCount = totalCount;
        this.totalPages = totalPages;
        this.page = page;
        this.pageSize = pageSize;
    }

    static create<T>(response: PageResponse<T>): PageResponseModel<T> {
        return new PageResponseModel(
          response.items,
          response.totalCount,
          response.totalPages,
          response.page,
          response.pageSize
        );
      }
}

export default PageResponseModel;
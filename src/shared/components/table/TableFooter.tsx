import { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "./assets";
import { TABLE_TEXTS } from "./table.constants";

interface TableFooterProps<T> {
  table: Table<T>;
  pageSizeOptions: number[];
  currentPage: number;
  totalPages: number;
  onPageChange: (newPageNumber: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

const TableFooter = <T,>({
  table,
  pageSizeOptions,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: TableFooterProps<T>) => {
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  return (
    <div className="flex items-center justify-between p-2 bg-fk-light-gray border-t border-t-gray-100 font-normal">
      <div className="flex-grow mb-2 text-fk-text-secondary">
        {table.getRowModel().rows.length === 0
          ? TABLE_TEXTS.NO_DATA
          : `${table.getRowModel().rows.length} of ${
              table.getFilteredRowModel().rows.length
            }`}
      </div>
      <div className="ml-44 text-fk-text-secondary">
        <span> {TABLE_TEXTS.SHOW_TEXT} </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="cursor-pointer bg-white border border-gray-100 rounded p-1 ml-2 text-fk-text-secondary"
          title={TABLE_TEXTS.ENTRIES_TOOLTIP}
        >
          {pageSizeOptions.map((size: number) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="ml-2 text-fk-text-secondary">
          {" "}
          {TABLE_TEXTS.ENTRIES_TEXT}{" "}
        </span>
      </div>
      <div className="flex flex-grow items-center justify-end space-x-[2px]">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title={TABLE_TEXTS.FIRST_PAGE}
          className={`flex items-center justify-center w-10 h-10 text-2xl
          ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-black hover:text-white hover:bg-gradient-to-b from-black/65 to-black/100 active:bg-black"
          }`}
        >
          <span className="font-thin"> <ChevronsLeftIcon/> </span>
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title={TABLE_TEXTS.PREVIOUS_PAGE}
          className={`flex items-center justify-center w-10 h-10 text-2xl
          ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-black hover:text-white hover:bg-gradient-to-b from-black/65 to-black/100 active:bg-black"
          }`}
        >
          <span className="font-thin"> <ChevronLeftIcon/> </span>
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-sm
              ${
                page === currentPage
                  ? "bg-gradient-to-b from-gray-200/10 to-black/10 border border-gray-300 text-fk-text-primary"
                  : "cursor-pointer hover:text-white hover:bg-gradient-to-b from-black/65 to-black/100 active:bg-black"
              }`}
            >
              <span> {page} </span>
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title={TABLE_TEXTS.NEXT_PAGE}
          className={`flex items-center justify-center w-10 h-10 text-2xl
          ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-black hover:text-white hover:bg-gradient-to-b from-black/65 to-black/100 active:bg-black"
          }`}
        >
          <span className="font-thin"> <ChevronRightIcon/> </span>
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          title={TABLE_TEXTS.LAST_PAGE}
          className={`flex items-center justify-center w-10 h-10 text-2xl
          ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-black hover:text-white hover:bg-gradient-to-b from-black/65 to-black/100 active:bg-black"
          }`}
        >
          <span className="font-thin"> <ChevronsRightIcon/> </span>
        </button>
      </div>
    </div>
  );
};

export default TableFooter;

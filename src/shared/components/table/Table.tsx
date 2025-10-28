import {
  ColumnDef, getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (data: T) => ReactNode | string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (newPageNumber: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  onSortChange?: (sortBy: string, sortDirection: 'asc' | 'desc') => void;
}

const pageSizeOptions = [10, 20, 50, 100];

const Table = <T,>({
  columns,
  data,
  isLoading,
  totalPages,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onSortChange,
}: TableProps<T>) => {
  const rowHeight = 'h-12';
  const [truncatedCells, setTruncatedCells] = useState<Record<string, boolean>>({});
  const cellRefs = useRef<Record<string, HTMLElement | null>>({});
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

  const columnDefs: ColumnDef<T>[] = columns.map((col) => ({
    header: col.header,
    accessorKey: col.accessor as string,
    cell: (info) => {
      const row = info.row.original;
      return col.render ? col.render(row) : String(info.getValue());
    },
    enableSorting: true,
  }));

  const table = useReactTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);
      
      if (newSorting.length > 0) {
        const { id, desc } = newSorting[0];
        onSortChange?.(id, desc ? 'desc' : 'asc');
      } else {
        onSortChange?.('', 'asc');
      }
    },
  });

  const rows = useMemo(() => table.getRowModel().rows, [table]);

  useEffect(() => {
    const checkTruncation = () => {
      const newTruncatedCells: Record<string, boolean> = {};
      Object.keys(cellRefs.current).forEach((cellId) => {
        const cellElement = cellRefs.current[cellId];
        if (cellElement) {
          const isTruncated = cellElement.scrollWidth > cellElement.clientWidth;
          newTruncatedCells[cellId] = isTruncated;
        }
      });
      setTruncatedCells(newTruncatedCells);
    };
  
    requestAnimationFrame(() => {
      setTimeout(checkTruncation, 100);
    });
  
    const handleResize = () => {
      requestAnimationFrame(() => {
        setTimeout(checkTruncation, 100);
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [rows]);

  return (
    <>
      <div className="border-t border-gray-100 rounded-2xl shadow-md mt-2">
        <table className="min-w-full divide-y bg-fk-light-gray rounded-t-2xl border-b border-b-gray-100 sticky top-0">
          <TableHeader headerGroups={table.getHeaderGroups()} />
        </table>
        <div className="overflow-y-auto sm:h-[300px] md:h-[350px] lg:max-h-[430px] 2xl:min-h-[480px]">
          <table className="min-w-full divide-y">
            <TableBody
              rows={table.getRowModel().rows}
              columns={columns}
              isLoading={isLoading}
              rowHeight={rowHeight}
              truncatedCells={truncatedCells}
              cellRefs={cellRefs}
            />
          </table>
        </div>
        <TableFooter
          table={table}
          pageSizeOptions={pageSizeOptions}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </>
  );
};

export default Table;

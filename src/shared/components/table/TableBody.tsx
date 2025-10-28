import { flexRender, ColumnDef, Row } from '@tanstack/react-table';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Tooltip } from '../tooltip';
import { TABLE_TEXTS } from './table.constants';

interface TableBodyProps<T> {
  rows: Row<T>[];
  columns: ColumnDef<T>[];
  isLoading: boolean;
  rowHeight: string;
  truncatedCells: Record<string, boolean>;
  cellRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const TableBody = <T,>({
  rows,
  columns,
  isLoading,
  rowHeight,
  truncatedCells,
  cellRefs,
}: TableBodyProps<T>) => {
  return (
    <tbody className="">
      {isLoading ? (
        [...Array(10)].map((_, index) => (
          <tr key={`skeleton-row-${index}`} className={rowHeight}>
            {columns.map((_column, colIndex) => (
              <td
                key={`skeleton-cell-${index}-${colIndex}`}
                className="px-6 whitespace-nowrap"
              >
                <SkeletonTheme baseColor="#eff1f6" highlightColor="#ffffff">
                  <Skeleton height="100%" />
                </SkeletonTheme>
              </td>
            ))}
          </tr>
        ))
      ) : rows.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="w-full h-[54vh] flex justify-center items-center text-gray-600 bg-white"
          >
            {TABLE_TEXTS.NO_DATA}
          </td>
        </tr>
      ) : (
        rows.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-fk-light-blue/5 hover:shadow-md"
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={`${cell.id}-${cell.column.id}`}
                className="px-6 text-center text-fk-text-secondary h-12 max-w-10 font-normal"
                data-cell-id={cell.id}
              >
                {truncatedCells[cell.id] ? (
                  <Tooltip
                    text={
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
                  >
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis"
                      ref={(el) => {if (el) cellRefs.current[cell.id] = el;}}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </Tooltip>
                ) : (
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis text-center"
                    ref={(el) => {if (el) cellRefs.current[cell.id] = el;}}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableBody;

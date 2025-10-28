import { flexRender, HeaderGroup } from '@tanstack/react-table';

interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
}

const TableHeader = <T,>({ headerGroups }: TableHeaderProps<T>) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}
                className="px-6 text-center text-md items-center text-fk-text-secondary font-bold 
                            max-w-10 tracking-wider rounded-2xl"
            >
              {header.isPlaceholder ? null : (
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                  <div className="flex flex-col ml-2">
                    <button 
                      onClick={() => header.column.toggleSorting(false)}
                      className={`cursor-pointer ${
                        header.column.getIsSorted() === 'asc'
                          ? 'text-gray-500'
                          : 'text-gray-300'
                      }`}
                    >
                      ▴
                    </button>
                    <button 
                      onClick={() => header.column.toggleSorting(true)}
                      className={`cursor-pointer ${
                        header.column.getIsSorted() === 'desc'
                          ? 'text-gray-500'
                          : 'text-gray-300'
                      }`}
                    >
                      ▾
                    </button>
                  </div>
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;

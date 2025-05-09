import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnFiltersState,
  ColumnDef,
  ColumnMeta,
  CellContext
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, useMemo, useRef } from 'react'
import ExplorerPlaceholder from '../components/ui/ExplorerPlaceholder'
import { useDataQuery } from '../lib/hooks/useDataQuery'
import { PantryRecord } from '../lib/types'

export const Route = createFileRoute('/data')({
  component: DataExplorer,
})

interface CustomColumnMeta {
  useSelectFilter: boolean
  width: string
  showFilter: boolean
}

type CustomColumnDef = ColumnDef<PantryRecord, unknown> & {
  meta: CustomColumnMeta
}

function DataExplorer() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Use Tanstack Query to fetch JSON data
  const { data: jsonData, isLoading, error } = useDataQuery<{ data: PantryRecord[], info: { rowCount: number } }>('/data/032025PND.json')

  // Define columns
  const columns = useMemo<CustomColumnDef[]>(() => [
    {
      accessorKey: 'pantryLocation',
      header: 'PANTRY LOCATION',
      cell: (info: CellContext<PantryRecord, unknown>) => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '200px', showFilter: true }
    },
    {
      accessorKey: 'benefitName',
      header: 'BENEFIT NAME',
      cell: (info: CellContext<PantryRecord, unknown>) => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '200px', showFilter: true }
    },
    {
      accessorKey: 'demographic',
      header: 'GENDER',
      cell: (info: CellContext<PantryRecord, unknown>) => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '200px', showFilter: true }
    },
    {
      accessorKey: 'education',
      header: 'EDUCATION',
      cell: (info: CellContext<PantryRecord, unknown>) => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '200px', showFilter: true }
    },
    {
      accessorKey: 'ageRange',
      header: 'AGE RANGE',
      cell: (info: CellContext<PantryRecord, unknown>) => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '200px', showFilter: true }
    },
    {
      accessorKey: 'zipCode',
      header: 'ZIP CODE',
      cell: (info: CellContext<PantryRecord, unknown>) => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '200px', showFilter: true }
    },
    {
      accessorKey: 'snap',
      header: 'SNAP',
      cell: (info: CellContext<PantryRecord, unknown>) => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '200px', showFilter: true }
    },
    {
      accessorKey: 'race',
      header: 'RACE',
      cell: (info: CellContext<PantryRecord, unknown>) => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '200px', showFilter: false }
    }
  ], [])

  // Initialize table
  const table = useReactTable({
    data: jsonData?.data || [],
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      equals: (row, id, filterValue) => {
        const value = row.getValue(id);
        return value === filterValue;
      },
      includesString: (row, id, filterValue) => {
        const value = row.getValue(id);
        return value?.toString().toLowerCase().includes(filterValue.toLowerCase()) ?? false;
      }
    },
    globalFilterFn: 'equals'
  })

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 48,
    overscan: 20,
  })

  const Filter = ({ column }: { column: any }) => {
    const columnFilterValue = column.getFilterValue() || '';
    const [isOpen, setIsOpen] = useState(false);

    if (column.columnDef.meta?.useSelectFilter) {
      const options = useMemo(() => {
        if (column.columnDef.meta?.filterOptions) {
          return column.columnDef.meta.filterOptions;
        }
        const uniqueValues = new Set<string>();
        table.getPreFilteredRowModel().flatRows.forEach(row => {
          const value = row.getValue(column.id);
          if (value) uniqueValues.add(value as string);
        });
        return Array.from(uniqueValues).sort().map(value => ({ value, label: value }));
      }, [column.id]);

      return (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border p-1 rounded text-sm text-left flex justify-between items-center bg-white"
          >
            <span className="truncate">
              {columnFilterValue ? options.find((opt: { value: string, label: string }) => opt.value === columnFilterValue)?.label || columnFilterValue : 'All'}
            </span>
            <span className="ml-2">▼</span>
          </button>
          {isOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              <div
                className="p-1 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  column.setFilterValue(undefined);
                  setIsOpen(false);
                }}
              >
                All
              </div>
              {options.map((option: { value: string, label: string }, i: number) => (
                <div
                  key={i}
                  className="p-1 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    column.setFilterValue(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type="text"
        value={columnFilterValue}
        onChange={e => {
          const value = e.target.value || undefined;
          column.setFilterValue(value);
          console.log(`Filter changed for ${column.id}:`, value);
        }}
        placeholder="Search..."
        className="w-full border p-1 rounded text-sm"
      />
    );
  };

  if (isLoading) return <ExplorerPlaceholder />
  if (error) return <div>Explorer Error: {error.message}</div>
  if (!jsonData?.data?.length) return <div>No data available</div>

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      {/* Filter Panel */}
      <div className="w-full rounded-lg p-2">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-700 mb-2">Filters</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {table.getAllColumns()
              .filter(column => column.getCanFilter() && (column.columnDef.meta as CustomColumnMeta)?.showFilter)
              .map(column => (
                <div key={column.id} className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-0.5">
                    {column.columnDef.header as string}
                  </label>
                  <Filter column={column} />
                </div>
              ))}
            <div className="flex items-end">
              <button
                onClick={() => {
                  table.resetColumnFilters();
                  console.log('All filters cleared');
                }}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm w-full"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-500">
            {table.getFilteredRowModel().rows.length} of {table.getPreFilteredRowModel().rows.length} records shown
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div
        ref={tableContainerRef}
        className="overflow-auto border rounded-md"
        style={{ height: '600px' }}
      >
        <table className="w-full border-collapse table-fixed" style={{ tableLayout: 'fixed' }}>
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {table.getHeaderGroups()[0].headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer whitespace-nowrap border-2 border-gray-300"
                  style={{
                    width: (header.column.columnDef.meta as any)?.width || '200px',
                    backgroundColor: '#e5e7eb',
                    position: 'sticky',
                    top: 0,
                    zIndex: 20,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <div className="flex items-center justify-center truncate">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() && (
                      <span className="ml-2">
                        {header.column.getIsSorted() === 'asc' ? '🔼' : '🔽'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  className={virtualRow.index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-center text-sm text-gray-700 border-2 border-gray-200 truncate"
                      style={{
                        width: (cell.column.columnDef.meta as any)?.width || '200px',
                        maxWidth: (cell.column.columnDef.meta as any)?.width || '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        position: 'relative'
                      }}
                      title={cell.getValue() as string}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnFiltersState
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { createFileRoute } from '@tanstack/react-router'
import { processExcelFile } from '../lib/data/excel'
import { useEffect, useState, useMemo, useRef } from 'react'
import ExplorerPlaceholder from '../components/ui/ExplorerPlaceholder'

export const Route = createFileRoute('/explorer')({
  component: RouteComponent,
})

function RouteComponent() {
  const [pantryData, setPantryData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  useEffect(() => {
    async function loadPantryData() {
      try {
        const result = await processExcelFile<any>('/data/032025NPD.xlsx', {
          sheetName: 'Network Data' // Specify which sheet to use
        })
        setPantryData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load products'))
      } finally {
        setIsLoading(false)
      }
    }

    loadPantryData()
  }, [])

  // Define columns - fixed the format and improved column definitions
  const columns = useMemo(() => [
    {
      accessorKey: 'BenefitName',
      header: 'BENEFIT NAME',
      cell: info => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '120px' }
    },
    {
      accessorKey: 'Name',
      header: 'NAME',
      cell: info => info.getValue() || '-',
      filterFn: 'includesString',
      meta: { useSelectFilter: false, width: '130px' }
    },
    {
      accessorKey: 'Race',
      header: 'RACE',
      cell: info => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '110px' }
    },
    {
      accessorKey: 'PantryLocation',
      header: 'PANTRY LOCATION',
      cell: info => {
        // Extract the proper pantry location data
        const value = info.getValue();
        if (value) return value;
        
        // Try to get from Created By field
        const row = info.row.original;
        if (row['Created By']) {
          // Extract just the pantry name from Created By
          const createdBy = row['Created By'];
          if (createdBy.includes('Human Services')) return 'West Des Moines Human Services';
          if (createdBy.includes('Pantry')) return createdBy;
          // Otherwise return the full value
          return createdBy;
        }
        return '-';
      },
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '220px' }
    },
    {
      accessorKey: 'SNAP',
      header: 'S N A P',
      cell: info => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '100px' }
    },
    {
      accessorKey: 'Gender',
      header: 'GENDER',
      cell: info => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '90px' }
    },
    {
      accessorKey: 'Education',
      header: 'EDUCATION',
      cell: info => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '160px' }
    },
    {
      accessorKey: 'Created By',
      header: 'CREATED BY',
      cell: info => info.getValue() || '-',
      filterFn: 'includesString',
      meta: { useSelectFilter: false, width: '150px' }
    },
    {
      accessorKey: 'Actual Completion Date',
      header: 'ACTUAL COMPLETION DATE',
      cell: info => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '110px' }
    },
    {
      accessorKey: 'IND ID',
      header: 'I N D I D',
      cell: info => info.getValue() || '-',
      filterFn: 'includesString',
      meta: { useSelectFilter: false, width: '120px' }
    },
    {
      accessorKey: 'HH ID',
      header: 'H H I D',
      cell: info => info.getValue() || '-',
      filterFn: 'includesString',
      meta: { useSelectFilter: false, width: '120px' }
    },
    {
      accessorKey: 'Age Range',
      header: 'AGE RANGE',
      cell: info => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '100px' }
    },
    {
      accessorKey: 'Zipcodes',
      header: 'ZIPCODES',
      cell: info => info.getValue() || '-',
      filterFn: 'equals',
      meta: { useSelectFilter: true, width: '100px' }
    }
  ], [])

  const table = useReactTable({
    data: pantryData,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)
  
  const { rows } = table.getRowModel()
  
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 48, // Increased row height for better spacing
    overscan: 20,
  })

  // Text filter component
  const TextFilter = ({ column }) => {
    const columnFilterValue = column.getFilterValue() || '';

    return (
      <input
        type="text"
        value={columnFilterValue}
        onChange={e => column.setFilterValue(e.target.value || undefined)}
        placeholder="Search..."
        className="w-full border p-1 rounded"
      />
    );
  };

  // Select filter component
  const SelectFilter = ({ column }) => {
    const options = useMemo(() => {
      const uniqueValues = new Set();
      table.getPreFilteredRowModel().flatRows.forEach(row => {
        const value = row.getValue(column.id);
        if (value !== null && value !== undefined && value !== '') {
          uniqueValues.add(value);
        }
      });
      return [...uniqueValues.values()].sort();
    }, [column.id, table]);

    const columnFilterValue = column.getFilterValue();

    return (
      <select
        value={columnFilterValue ?? ''}
        onChange={e => column.setFilterValue(e.target.value || undefined)}
        className="w-full border p-1 rounded"
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  if (isLoading) return <ExplorerPlaceholder />
  if (error) return <div>Explorer Error: {error.message}</div>

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      {/* Data Filter */}
      <div className="container mx-auto w-full rounded-lg bg-gray-300 p-4">
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-bold text-gray-500 mb-4">Filter</p>
          
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {table.getAllColumns().map(column => {
              if (!column.getCanFilter()) return null;
              
              const header = column.columnDef.header;
              
              return (
                <div key={column.id} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {typeof header === 'function' ? column.id : header}
                  </label>
                  <div>
                    {column.columnDef.meta?.useSelectFilter ? (
                      <SelectFilter column={column} />
                    ) : (
                      <TextFilter column={column} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Reset Filters Button */}
          <div className="mt-4 flex justify-between items-center w-full">
            <div className="text-sm text-gray-500">
              {table.getFilteredRowModel().rows.length} of {table.getPreFilteredRowModel().rows.length} records shown
            </div>
            <button
              onClick={() => table.resetColumnFilters()}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div 
        ref={tableContainerRef}
        className="overflow-auto border rounded-md"
        style={{ height: '600px' }}
      >
        <div className="relative">
          <table className="w-full table-fixed border-collapse" style={{ tableLayout: 'fixed' }}>
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {table.getHeaderGroups()[0].headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer whitespace-nowrap border-2 border-gray-300"
                    style={{ 
                      width: header.column.columnDef.meta?.width || 'auto',
                      backgroundColor: '#e5e7eb'
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      <span className="ml-2">
                        {{
                          asc: '🔼',
                          desc: '🔽',
                        }[header.column.getIsSorted() as string] ?? ''}
                      </span>
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
                          width: cell.column.columnDef.meta?.width || 'auto',
                          maxWidth: cell.column.columnDef.meta?.width || 'auto',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
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
    </div>
  )
}
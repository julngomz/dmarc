import { createFileRoute } from '@tanstack/react-router'
import ExplorerPlaceholder from '../components/ui/ExplorerPlaceholder'
import { useExcelQuery } from '../lib/hooks/useExcelQuery'

interface PantryRecord {
  ID: string | number
  BenefitName: string
  Name: string
  Race: string
  PantryLocation: string
  SNAP: string
  Education: string
}

interface ExcelResponse {
  data: PantryRecord[]
  info: {
    sheetName: string
    rowCount: number
  }
}

export const Route = createFileRoute('/data')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: excelData, isLoading, error } = useExcelQuery<ExcelResponse>('/data/032025NPD.xlsx', {
    sheetName: 'Network Data'
  })

  if (isLoading) return <ExplorerPlaceholder />
  if (error) return <div>Explorer Error: {error.message}</div>
  if (!excelData?.data?.length) return <div>No data available</div>

  const pantryData = excelData.data

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      {/* Data Summary Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Network Data Explorer</h2>
        <div className="text-sm text-gray-500">
          Showing {pantryData.length} records from {excelData.info.sheetName}
        </div>
      </div>

      {/* Data Filter */}
      <div className='container mx-auto w-full h-14 md:h-14 rounded-lg bg-gray-300'>
        <div className='flex flex-col justify-center items-center h-full'>
          <p className='text-2xl font-bold text-gray-500'>Filter</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-clip">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100 text-sm border-b">
            <tr className='*:text-nowrap *:p-4 text-left'>
              <th>ID</th>
              <th>Benefit Name</th>
              <th>Name</th>
              <th>Race</th>
              <th>Pantry Location</th>
              <th>SNAP</th>
              <th>Education</th>
            </tr>
          </thead>
          <tbody>
            {pantryData.slice(0, 10).map((pantryRecord, i) => (
              <tr key={i} className="hover:bg-gray-50 *:text-sm *:text-nowrap *:text-ellipsis">
                <td className="py-2 px-4 border-b">{pantryRecord.ID}</td>
                <td className="py-2 px-4 border-b">{pantryRecord.BenefitName}</td>
                <td className="py-2 px-4 border-b">{pantryRecord.Name}</td>
                <td className="py-2 px-4 border-b">{pantryRecord.Race}</td>
                <td className="py-2 px-4 border-b">{pantryRecord.PantryLocation}</td>
                <td className="py-2 px-4 border-b">{pantryRecord.SNAP}</td>
                <td className={`py-2 px-4 border-b`}>{pantryRecord.Education}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

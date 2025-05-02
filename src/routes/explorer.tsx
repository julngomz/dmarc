import { createFileRoute } from '@tanstack/react-router'
import { processExcelFile } from '../lib/data/excel'
import { useEffect, useState } from 'react'
import ExplorerPlaceholder from '../components/ui/ExplorerPlaceholder'

export const Route = createFileRoute('/explorer')({
  component: RouteComponent,
})

const PantryData = [
  { id: 1, age: '18-24', race: 'White', education: 'High School', zipCode: '50309', snapRecipient: 'Yes', householdSize: 2, visitFrequency: 'Weekly' },
  { id: 2, age: '25-34', race: 'Black', education: 'Some College', zipCode: '50310', snapRecipient: 'No', householdSize: 4, visitFrequency: 'Monthly' },
  { id: 3, age: '35-44', race: 'Hispanic', education: 'Bachelor', zipCode: '50311', snapRecipient: 'Yes', householdSize: 3, visitFrequency: 'Weekly' },
  { id: 4, age: '45-54', race: 'Asian', education: 'Master', zipCode: '50312', snapRecipient: 'No', householdSize: 1, visitFrequency: 'Bi-weekly' },
  { id: 5, age: '55-64', race: 'White', education: 'PhD', zipCode: '50313', snapRecipient: 'Yes', householdSize: 2, visitFrequency: 'Monthly' },
  { id: 6, age: '65+', race: 'Black', education: 'High School', zipCode: '50314', snapRecipient: 'No', householdSize: 1, visitFrequency: 'Weekly' },
  { id: 7, age: '25-34', race: 'White', education: 'Bachelor', zipCode: '50315', snapRecipient: 'Yes', householdSize: 5, visitFrequency: 'Bi-weekly' },
  { id: 8, age: '35-44', race: 'Hispanic', education: 'Some College', zipCode: '50316', snapRecipient: 'No', householdSize: 3, visitFrequency: 'Monthly' },
  { id: 9, age: '18-24', race: 'Asian', education: 'High School', zipCode: '50317', snapRecipient: 'Yes', householdSize: 2, visitFrequency: 'Weekly' },
  { id: 10, age: '55-64', race: 'White', education: 'Master', zipCode: '50310', snapRecipient: 'No', householdSize: 1, visitFrequency: 'Bi-weekly' },
  { id: 11, age: '45-54', race: 'Black', education: 'Bachelor', zipCode: '50311', snapRecipient: 'Yes', householdSize: 4, visitFrequency: 'Monthly' },
  { id: 12, age: '65+', race: 'Hispanic', education: 'High School', zipCode: '50312', snapRecipient: 'No', householdSize: 2, visitFrequency: 'Weekly' },
  { id: 13, age: '25-34', race: 'Asian', education: 'PhD', zipCode: '50313', snapRecipient: 'Yes', householdSize: 3, visitFrequency: 'Bi-weekly' },
  { id: 14, age: '35-44', race: 'White', education: 'Some College', zipCode: '50314', snapRecipient: 'No', householdSize: 6, visitFrequency: 'Monthly' },
  { id: 15, age: '18-24', race: 'Black', education: 'High School', zipCode: '50315', snapRecipient: 'Yes', householdSize: 1, visitFrequency: 'Weekly' },
]

function RouteComponent() {
  const [pantryData, setPantryData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

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

  console.log(pantryData[0])

  if (isLoading) return <ExplorerPlaceholder />
  if (error) return <div>Explorer Error: {error.message}</div>


  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      {/* Data Summary Header */}
      <div>

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
              < tr key={i} className="hover:bg-gray-50 *:text-sm *:text-nowrap *:text-ellipsis" >
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
    </div >
  )
}

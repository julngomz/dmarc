import { useQuery } from '@tanstack/react-query'
import { PantryRecord } from '../types'

export interface DataResponse {
  data: PantryRecord[]
  info: {
    rowCount: number
  }
}

export function useDataQuery<T = DataResponse>(
  filePath: string,
) {
  return useQuery({
    queryKey: ['data', filePath],
    queryFn: async () => {
      const response = await fetch(filePath)
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }
      const records = await response.json()

      // Ensure records is an array
      if (!Array.isArray(records)) {
        throw new Error('Expected JSON data to be an array')
      }

      // Transform the data to match PantryRecord type
      const transformedData = records.map((record: any) => ({
        id: record.indId || '',
        benefitName: record.benefitName || '',
        name: record.name || '',
        race: record.race || '',
        pantryLocation: record.pantryLocation || '',
        snap: record.snap || '',
        education: record.education || '',
        city: record.createdBy || '', // Using createdBy as city for now
        zipCode: record.zipCode?.toString() || '',
        year: record.actualCompletionDate?.split('/')[2] || '',
        month: record.actualCompletionDate?.split('/')[0] || '',
        demographic: record.gender || '',
        demographicSubcategory: '', // Not present in the data
        ageRange: record.ageRange || ''
      }))

      return {
        data: transformedData,
        info: {
          rowCount: transformedData.length
        }
      } as T
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
} 

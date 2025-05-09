import { PantryRecord } from '../types'

export interface JsonParserOptions {
  filter?: (row: any) => boolean
  transform?: (row: any) => any
}

export function parseJsonData<T = PantryRecord>(
  jsonData: any[],
  options?: JsonParserOptions
): T[] {
  let data = jsonData

  // Transform the data to match PantryRecord type
  data = data.map(record => {
    console.log('Original record date:', record.actualCompletionDate);
    return {
      id: record.indId || '',
      benefitName: record.benefitName || '',
      name: record.name || '',
      race: record.race || '',
      pantryLocation: record.pantryLocation || '',
      snap: record.snap || '',
      education: record.education || '',
      zipCode: record.zipCode?.toString() || '',
      year: record.actualCompletionDate?.split('-')[0] || '',
      month: record.actualCompletionDate?.split('-')[1] || '',
      demographic: record.gender || '',
      ageRange: record.ageRange || '',
      actualCompletionDate: record.actualCompletionDate || ''
    };
  })

  // Apply filter if provided
  if (options?.filter) {
    data = data.filter(options.filter)
  }

  // Apply transform if provided
  if (options?.transform) {
    data = data.map(options.transform)
  }

  return data as T[]
}

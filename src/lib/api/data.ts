import { parseJsonData, JsonParserOptions } from '../utils/jsonParser'
import { PantryRecord } from '../types'

export interface DataProcessingOptions extends JsonParserOptions {
  filterOptions?: any
}

export async function processData(
  jsonData: any[],
  options?: DataProcessingOptions
) {
  try {
    const data = parseJsonData<PantryRecord>(jsonData, {
      filter: options?.filter,
      transform: options?.transform
    })

    return {
      data,
      info: {
        rowCount: data.length
      }
    }
  } catch (error) {
    console.error('Error processing data:', error)
    throw error
  }
} 
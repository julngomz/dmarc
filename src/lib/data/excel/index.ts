export * from './parser'
export * from './extractor'
export * from './transformer'

import { fetchExcelFile } from './parser'
import { extractSheetData } from './extractor'
import { transformData, filterData } from './transformer'
import * as XLSX from 'xlsx'

/**
 * Main Excel processing function that combines parsing, extraction, and transformation
 */
export async function processExcelFile<T, R = T>(
  filePath: string,
  options?: {
    sheetName?: string
    parserOptions?: XLSX.Sheet2JSONOpts
    filter?: (row: T) => boolean
    transform?: (row: T, index: number) => R
  }
): Promise<{
  data: R[] | T[]
  info: { sheetName: string; rowCount: number }
}> {
  // Get Excel workbook
  const workbook = await fetchExcelFile(filePath)

  // Determine sheet to use
  const sheetName = options?.sheetName || workbook.SheetNames[0]

  // Extract data
  let data = await extractSheetData<T>(filePath, sheetName, options?.parserOptions)

  // Apply filter if provided
  if (options?.filter) {
    data = filterData(data, options.filter)
  }

  // Apply transformation if provided
  let transformedData: R[] | T[] = data
  if (options?.transform) {
    transformedData = transformData(data, options.transform)
  }

  return {
    data: transformedData,
    info: {
      sheetName,
      rowCount: data.length
    }
  }
}

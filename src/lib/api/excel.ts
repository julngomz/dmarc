import { processExcelFile } from '../data/excel'

export interface ExcelProcessingOptions {
  sheetName?: string
  parserOptions?: {
    raw?: boolean
    dateNF?: string
    defval?: any
  }
  filter?: (row: any) => boolean
  transform?: (row: any, index: number) => any
}

export async function processExcelData(
  filePath: string,
  options?: ExcelProcessingOptions
) {
  try {
    const result = await processExcelFile(filePath, {
      sheetName: options?.sheetName,
      parserOptions: options?.parserOptions,
      filter: options?.filter,
      transform: options?.transform
    })
    return result
  } catch (error) {
    console.error('Error processing Excel file:', error)
    throw error
  }
} 
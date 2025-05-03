import { useQuery } from '@tanstack/react-query'
import { processExcelData, ExcelProcessingOptions } from '../api/excel'

export function useExcelQuery<T = any>(
  filePath: string,
  options?: ExcelProcessingOptions
) {
  return useQuery({
    queryKey: ['excel', filePath, options],
    queryFn: () => processExcelData(filePath, options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
} 
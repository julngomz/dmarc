import { useState, useEffect } from 'react'
import * as ExcelModule from '../data/excel'
import * as XLSX from 'xlsx'

interface UseExcelOptions<T, R = T> {
  sheetName?: string;
  parserOptions?: XLSX.Sheet2JSONOpts;
  filter?: (row: T) => boolean;
  transform?: (row: T, index: number) => R;
  autoLoad?: boolean;
}

export function useExcel<T, R = T>(
  filePath: string,
  options?: UseExcelOptions<T, R>
) {
  const [data, setData] = useState<R[] | T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(options?.autoLoad !== false);
  const [error, setError] = useState<Error | null>(null);
  const [info, setInfo] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const reload = () => {
    setIsLoading(true);
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    let isMounted = true;

    if (isLoading) {
      ExcelModule.processExcelFile<T, R>(filePath, {
        sheetName: options?.sheetName,
        parserOptions: options?.parserOptions,
        filter: options?.filter,
        transform: options?.transform
      })
        .then(result => {
          if (isMounted) {
            setData(result.data);
            setInfo(result.info);
            setError(null);
          }
        })
        .catch(err => {
          if (isMounted) {
            setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [filePath, refreshKey, isLoading, options?.sheetName]);

  return {
    data,
    isLoading,
    error,
    info,
    reload
  };
}

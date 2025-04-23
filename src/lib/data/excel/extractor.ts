import * as XLSX from 'xlsx';
import { fetchExcelFile } from './parser';

/**
 * Extract data from specific Excel sheet
 */
export async function extractSheetData<T>(
  filePath: string,
  sheetName: string,
  options: XLSX.Sheet2JSONOpts = {}
): Promise<T[]> {
  try {
    const workbook = await fetchExcelFile(filePath);

    if (!workbook.SheetNames.includes(sheetName)) {
      throw new Error(`Sheet "${sheetName}" not found in Excel file`);
    }

    const worksheet = workbook.Sheets[sheetName];

    return XLSX.utils.sheet_to_json<T>(worksheet, {
      raw: options.raw ?? false,
      dateNF: options.dateNF ?? 'yyyy-mm-dd',
      defval: options.defval ?? null,
      ...options
    });
  } catch (error) {
    console.error(`Error extracting data from sheet "${sheetName}":`, error);
    throw error;
  }
}

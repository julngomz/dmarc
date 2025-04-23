// src/lib/excel/types.ts
export interface ExcelRowData {
  [key: string]: string | number | boolean | Date | null;
}

export interface ExcelParserOptions {
  raw?: boolean;
  dateFormat?: string;
  defaultValue?: null | string | number;
}

export interface ExcelFileInfo {
  sheetNames: string[];
  activeSheet: string;
  rowCount: number;
  columnCount: number;
}

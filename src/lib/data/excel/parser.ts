import * as XLSX from 'xlsx'


/**
 * Get public URL path in a way that works with Vite
 */
function getPublicPath(filePath: string): string {
  // For Vite projects, use import.meta.env instead of process.env
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${filePath.startsWith('/') ? filePath.slice(1) : filePath}`;
}

/**
 * Fetch Excel file from public directory and parse into workbook
 */
export async function fetchExcelFile(filePath: string): Promise<XLSX.WorkBook> {
  try {
    const fullPath = getPublicPath(filePath)
    const response = await fetch(fullPath)

    if (!response.ok) {
      throw new Error(`Failed to fetch Excel file: ${response.statusText}`)
    }

    const fileBuffer = await response.arrayBuffer()
    return XLSX.read(new Uint8Array(fileBuffer), { type: 'array' })
  } catch (error) {
    console.error('Error fetching Excel file:', error)
    throw error
  }
}

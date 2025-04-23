// src/lib/excel/transformer.ts
/**
 * Transform raw Excel data according to schema
 */
export function transformData<T, R>(
  data: T[],
  transformer: (row: T, index: number) => R
): R[] {
  return data.map(transformer);
}

/**
 * Filter Excel data based on criteria
 */
export function filterData<T>(
  data: T[],
  predicate: (row: T) => boolean
): T[] {
  return data.filter(predicate);
}

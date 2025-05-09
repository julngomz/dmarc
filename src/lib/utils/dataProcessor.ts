import { PantryRecord, Crumbs } from '../types'

export interface SummaryStats {
  totalRecords: number
  uniqueLocations: number
  snapRecipients: number
  educationLevels: Record<string, number>
  raceDistribution: Record<string, number>
  ageDistribution: Record<string, number>
}

export function filterByCrumbs(data: PantryRecord[], crumbs: Crumbs): PantryRecord[] {
  console.log(data)
  return data.filter(record => {
    if (crumbs.demographic !== "Overall" && record.demographic !== crumbs.demographic) return false
    if (crumbs.demographicSubcategory !== "All" && record.demographicSubcategory !== crumbs.demographicSubcategory) return false
    if (crumbs.selectedCity !== "Overall" && record.city !== crumbs.selectedCity) return false
    if (crumbs.selectedZipCode !== "All" && record.zipCode !== crumbs.selectedZipCode) return false
    if (crumbs.year !== "All" && record.year !== crumbs.year) return false
    if (crumbs.month !== "All" && record.month !== crumbs.month) return false
    return true
  })
}

export function getSummaryStats(data: PantryRecord[]): SummaryStats {
  const uniqueLocations = new Set(data.map(record => record.pantryLocation))
  const educationLevels: Record<string, number> = {}
  const raceDistribution: Record<string, number> = {}
  const ageDistribution: Record<string, number> = {}
  let snapRecipients = 0

  data.forEach(record => {
    educationLevels[record.education] = (educationLevels[record.education] || 0) + 1
    raceDistribution[record.race] = (raceDistribution[record.race] || 0) + 1
    ageDistribution[record.demographic] = (ageDistribution[record.demographic] || 0) + 1

    if (record.snap === "Yes") snapRecipients++
  })

  return {
    totalRecords: data.length,
    uniqueLocations: uniqueLocations.size,
    snapRecipients,
    educationLevels,
    raceDistribution,
    ageDistribution
  }
}

export function getDataByYear(data: PantryRecord[], year: string): PantryRecord[] {
  return data.filter(record => record.year === year)
}

export function getDataByDemographic(data: PantryRecord[], demographic: string): PantryRecord[] {
  return data.filter(record => record.demographic === demographic)
}

export function getDataByLocation(data: PantryRecord[], location: string): PantryRecord[] {
  return data.filter(record => record.pantryLocation === location)
}

export function getDataByEducation(data: PantryRecord[], education: string): PantryRecord[] {
  return data.filter(record => record.education === education)
}

export function getDataByRace(data: PantryRecord[], race: string): PantryRecord[] {
  return data.filter(record => record.race === race)
}

export function getDataBySNAPStatus(data: PantryRecord[], isSNAP: boolean): PantryRecord[] {
  return data.filter(record => (isSNAP ? record.snap === "Yes" : record.snap === "No"))
}

export function getUniqueValues(data: PantryRecord[], field: string): string[] {
  return Array.from(new Set(data.map(record => record[field as keyof PantryRecord] as string)))
}

export function getYearlySummary(data: PantryRecord[]): Record<string, number> {
  const yearlySummary: Record<string, number> = {}
  data.forEach(record => {
    yearlySummary[record.year] = (yearlySummary[record.year] || 0) + 1
  })
  return yearlySummary
}

export function getMonthlySummary(data: PantryRecord[]): Record<string, number> {
  const monthlySummary: Record<string, number> = {}
  data.forEach(record => {
    monthlySummary[record.month] = (monthlySummary[record.month] || 0) + 1
  })
  return monthlySummary
} 

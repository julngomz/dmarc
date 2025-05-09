import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MapPlaceholder from '../components/ui/MapPlaceholder'
import Map from '../components/map/Map'
import DataCrumbs from '../components/map/DataCrumbs'
import { Crumbs, PantryRecord } from '../lib/types'
import DataFilter from '../components/map/DataFilter'
import Modal from '../components/map/Modal'
import CenterControl from '../components/map/CenterControl'
import { useDataQuery } from '../lib/hooks/useDataQuery'
import {
  filterByCrumbs,
  getDataBySNAPStatus,
  getSummaryStats,
  getYearlySummary,
  getMonthlySummary,
  getUniqueValues
} from '../lib/utils/dataProcessor'

const defaultCrumbs: Crumbs = {
  demographic: "Overall",
  demographicSubcategory: "All",
  selectedCity: "Overall",
  selectedZipCode: "All",
  year: "2025",
  month: "All"
}

interface DataResponse {
  data: PantryRecord[]
  info: {
    rowCount: number
  }
}

function Index() {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [crumbs, setCrumbs] = useState<Crumbs>(defaultCrumbs)
  const [filteredData, setFilteredData] = useState<PantryRecord[]>([])
  const [summaryStats, setSummaryStats] = useState<any>(null)

  // Modal handlers
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Filter handlers
  const handleFilterChange = (newCrumbs: Crumbs) => {
    setCrumbs(newCrumbs)
  }

  const handleResetFilter = () => {
    setCrumbs(defaultCrumbs)
  }

  // Load the data
  const { data: jsonData, isLoading, error } = useDataQuery<DataResponse>('/data/032025PND.json')

  useEffect(() => {
    if (jsonData?.data) {
      const filtered = filterByCrumbs(jsonData.data, crumbs)
      setFilteredData(filtered)
      setSummaryStats(getSummaryStats(filtered))
      setIsDataLoaded(true)
      console.log(`Updated Data: ${filtered}`)
    }
  }, [jsonData, crumbs])

  if (isLoading) return <MapPlaceholder />
  if (error) return <div>Map Data Error: {error.message}</div>
  if (!jsonData?.data?.length) return <div>No data available</div>

  const pantryLocations: string[] = getUniqueValues(jsonData.data, 'pantryLocation')
  const benefitNames: string[] = getUniqueValues(jsonData.data, 'benefitName')
  const zipCodes: string[] = getUniqueValues(jsonData.data, 'zipCodes')

  console.log(zipCodes)

  return (
    <>
      {/* Map takes full width and height */}
      <div className="absolute inset-0">
        <Map context={'cities'} />
      </div>

      <DataFilter
        data={crumbs}
        onFilterChange={handleFilterChange}
      />

      <DataCrumbs
        crumbs={crumbs}
        onClick={openModal} />

      <Modal
        data={filteredData}
        summaryStats={summaryStats}
        crumbs={crumbs}
        isOpen={isModalOpen}
        onClose={closeModal} />

      <CenterControl onClick={handleResetFilter} />
    </>
  )
}

export const Route = createFileRoute('/')({
  component: Index
})

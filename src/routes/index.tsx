import { useState, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '../components/map/Sidebar'
import LocationModal from '../components/map/LocationModal'
import MapPlaceholder from '../components/ui/MapPlaceholder'

import Map from '../components/map/Map'
import { mockLocations } from './pantries'
import DataCrumbs from '../components/map/DataCrumbs'
import { Crumbs } from '../lib/types'
import DataFilter from '../components/map/DataFilter'
import Modal from '../components/map/Modal'
import CenterControl from '../components/map/CenterControl'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  // State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [resetData, setResetData] = useState<boolean>(false)

  const resetFilter = () => setResetData(true)

  const [demographic, setDemographic] = useState('Overall')
  const [demographicSubcategory, setDemographicSubcategory] = useState('All')
  const [selectedCity, setSelectedCity] = useState('Overall')
  const [selectedZipCode, setSelectedZipCode] = useState('All')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('All')

  const [crumbs, setCrumbs] = useState<Crumbs>({
    demographic: "Overall",
    year: "2025",
    month: "All",
    demographicSubcategory: "All",
    selectedCity: "Overall",
    selectedZipCode: "Overall"
  })

  const updateCrumbs = (updates: Partial<Crumbs>) => {
    setCrumbs((prevCrumbs: Crumbs) => {
      return { ...prevCrumbs, ...updates }
    })
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Map takes full width and height */}
      <div className="absolute inset-0">
        <Map context={'cities'} />
      </div>

      <DataFilter
        onChange={updateCrumbs} />

      <DataCrumbs
        crumbs={crumbs}
        onClick={openModal} />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal} />

      <CenterControl onClick={resetFilter} />
    </>
  )
}

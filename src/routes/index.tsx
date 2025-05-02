import { useState, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MapPlaceholder from '../components/ui/MapPlaceholder'
import Map from '../components/map/Map'
import DataCrumbs from '../components/map/DataCrumbs'
import { Crumbs } from '../lib/types'
import DataFilter from '../components/map/DataFilter'
import Modal from '../components/map/Modal'
import CenterControl from '../components/map/CenterControl'
        

const defaultCrumbs: Crumbs = {
  demographic: "Overall",
  demographicSubcategory: "All",
  selectedCity: "Overall",
  selectedZipCode: "All",
  year: "2025",
  month: "All"
}

function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [crumbs, setCrumbs] = useState<Crumbs>(defaultCrumbs)

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

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [crumbs, setCrumbs] = useState<Crumbs>(defaultCrumbs)

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
        data={{ data: "data" }}
        isOpen={isModalOpen}
        onClose={closeModal} />

      <CenterControl onClick={handleResetFilter} />
    </>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})

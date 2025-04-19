import { useState, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '../components/map/Sidebar'
import LocationModal from '../components/map/LocationModal'
import MapPlaceholder from '../components/ui/MapPlaceholder'
import PantryButton from '../components/map/PantryButton'
import DataButton from '../components/map/DataButton'

import Map from '../components/map/Map'
import DataBox from '../components/map/DataBox'

import { mockLocations, Location } from '../lib/types'
import { useClickOutside, useTransitionState } from '../lib/hooks'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  // State
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  // Footer
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Pantry Button Visibility State
  // const showPantryButton = useTransitionState(!sidebarOpen, 200)

  // Sidebar
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const openSidebar = () => setSidebarOpen(true)
  const closeSidebar = () => setSidebarOpen(false)

  // Location Modal
  const openModal = (location: Location) => {
    setSelectedLocation(location)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  return (
    <>
      {/* Map takes full width and height */}
      <div className="absolute inset-0">
        <Map context={'cities'} />
      </div>

      {/* Sidebar AFTER the buttons (higher in DOM order) */}
      <Sidebar
        isOpen={sidebarOpen}
        sidebarRef={sidebarRef}
        locations={mockLocations}
        closeSidebar={closeSidebar}
        openModal={openModal}
      />

      {/* Buttons first (lower in DOM order) */}
      <PantryButton
        onClick={openSidebar}
      />

      <DataButton />

      {/* Modal in top layer */}
      <LocationModal
        isOpen={modalOpen}
        location={selectedLocation}
        closeModal={closeModal}
      />
    </>
  )
}

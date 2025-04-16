import { useState, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '../components/ui/Sidebar'
import LocationModal from '../components/ui/LocationModal'
import MapPlaceholder from '../components/ui/MapPlaceholder'
import PantryButton from '../components/ui/PantryButton'
import { mockLocations, Location } from '../lib/types'
import { useClickOutside, useTransitionState } from '../lib/hooks'
import FooterTab from '../components/ui/FooterTab'

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
  const toggleFooter = () => setIsFooterVisible(!isFooterVisible);

  // Pantry Button Visibility State
  const showPantryButton = useTransitionState(!sidebarOpen, 400)

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
      <Sidebar
        isOpen={sidebarOpen}
        sidebarRef={sidebarRef}
        locations={mockLocations}
        closeSidebar={closeSidebar}
        openModal={openModal}
      />

      {/* "Find a pantry" button - extracted to PantryButton component */}
      <PantryButton isVisible={showPantryButton} onClick={openSidebar} />

      {/* Footer tab */}
      <FooterTab isFooterVisible={isFooterVisible} toggleFooter={toggleFooter} />

      {/* Map Placeholder */}
      <MapPlaceholder />

      <LocationModal isOpen={modalOpen} location={selectedLocation} closeModal={closeModal} />
    </>
  )
}

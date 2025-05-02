import { createFileRoute } from '@tanstack/react-router'
import Map from '../components/map/Map.tsx'
import { Crumbs } from '../../lib/types'

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

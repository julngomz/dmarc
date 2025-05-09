import { X } from "lucide-react"

interface ModalProps {
<<<<<<< Updated upstream
  data: any
=======
  data: PantryRecord[]
  summaryStats: SummaryStats
  filter: Crumbs
>>>>>>> Stashed changes
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({
  data,
<<<<<<< Updated upstream
=======
  summaryStats,
  filter,
>>>>>>> Stashed changes
  isOpen,
  onClose
}: ModalProps) => {
  return (
    <div
      className={` 
          ${isOpen ? '' : 'hidden'} 
          backdrop-blur-[1px] backdrop-brightness-50 absolute z-10 
          w-full h-full flex justify-center items-center 
          transition-all duration-300 ease-in
      `}>
      <div className="relative bg-white rounded-lg h-11/12 w-11/12 md:w-8/12 md:h-11/12">
        <div className="absolute top-2 right-2 left-auto">
          <button
            onClick={onClose}
<<<<<<< Updated upstream
            className="hover:bg-red-400 hover:text-red-100 hover:cursor-pointer rounded-full p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
=======
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Overview</h3>
            <p>Total Records: {summaryStats.totalRecords}</p>
            <p>Unique Locations: {summaryStats.uniqueLocations}</p>
            <p>SNAP Recipients: {summaryStats.snapRecipients}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Current Filters</h3>
            <p>Demographic: {filter.demographic}</p>
            <p>Location: {filter.pantryLocation}</p>
            <p>Year: {filter.year}</p>
            <p>Month: {filter.month}</p>
          </div>
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Education Levels</h3>
            {Object.entries(summaryStats.educationLevels).map(([level, count]) => (
              <p key={level}>{level}: {count}</p>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Race Distribution</h3>
            {Object.entries(summaryStats.raceDistribution).map(([race, count]) => (
              <p key={race}>{race}: {count}</p>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Age Distribution</h3>
            {Object.entries(summaryStats.ageDistribution).map(([age, count]) => (
              <p key={age}>{age}: {count}</p>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100 text-sm border-b">
              <tr className='*:text-nowrap *:p-4 text-left'>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Race</th>
                <th>Education</th>
                <th>SNAP</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((record, i) => (
                <tr key={i} className="hover:bg-gray-50 *:text-sm *:text-nowrap *:text-ellipsis">
                  <td className="py-2 px-4 border-b">{record.id}</td>
                  <td className="py-2 px-4 border-b">{record.name}</td>
                  <td className="py-2 px-4 border-b">{record.pantryLocation}</td>
                  <td className="py-2 px-4 border-b">{record.race}</td>
                  <td className="py-2 px-4 border-b">{record.education}</td>
                  <td className="py-2 px-4 border-b">{record.snap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  )
}

export default Modal

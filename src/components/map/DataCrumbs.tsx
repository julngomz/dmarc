import { BarChart3, ChevronRight } from "lucide-react"
import { Crumbs } from "../../lib/types"

interface DataCrumbsProps {
  crumbs: Crumbs,
  onClick?: () => void
}

const DataCrumbs: React.FC<DataCrumbsProps> = ({
  crumbs,
  onClick
}: DataCrumbsProps) => {
  return (
    <div
      onClick={onClick}
      className="absolute hover:cursor-pointer bottom-0 left-0 right-0 md:bottom-4 md:left-4 md:right-auto items-center bg-white rounded-md">
      <div className="flex items-center text-sm text-gray-700">
        <div className='bg-white p-3 text-gray-800 rounded-bl-md rounded-tl-md'>
          <BarChart3 className="h-5 w-5" />
        </div>

        <div className='flex p-3'>
          {/* Year and Month */}
          {crumbs.month === 'All' ? (
            <span className="font-medium">Summary {crumbs.year}</span>
          ) : (
            <>
              <span className="font-medium">{crumbs.year}</span>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
              <span>{crumbs.month}</span>
            </>
          )}

          {/* Location */}
          {crumbs.selectedCity !== 'Overall' && (
            <>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
              <span>{crumbs.selectedCity}</span>
            </>
          )}

          {/* Zip Code */}
          {crumbs.selectedCity !== 'Overall' && crumbs.selectedZipCode !== 'All' && (
            <>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
              <span>{crumbs.selectedZipCode}</span>
            </>
          )}

          {/* Demographic */}
          {crumbs.demographic !== 'Overall' && (
            <>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
              <span>{crumbs.demographic}</span>
            </>
          )}

          {/* Demographic Subcategory */}
          {crumbs.demographic !== 'Overall' && crumbs.demographicSubcategory !== 'All' && (
            <>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
              <span>{crumbs.demographicSubcategory}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DataCrumbs

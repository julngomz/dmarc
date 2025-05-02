import { X } from "lucide-react"

interface DataModalProps {
  isOpen: boolean
  onClose: () => void
}

const DataModal: React.FC<DataModalProps> = ({
  isOpen,
  onClose
}: DataModalProps) => {
  return (
    <>
      {/* Overlay*/}
      <div
        className={`
          z-10 flex flex-col items-center justify-center w-full h-full backdrop-brightness-[45%] backdrop-blur-[1px]
          ${isOpen ? 'block' : 'hidden'}
        `}>
        {/* Modal */}
        <div className="relative p-4 rounded-md bg-white shadow-xl w-11/12 h-11/12 md:h-11/12 md:w-8/12">
          <div className="absolute top-2 right-2 left-auto">
            <span
              onClick={() => onClose()}
              className="flex items-center justify-center p-1 rounded-full hover:cursor-pointer text-gray-400 hover:text-red-300">
              <X className="w-5 h-5" />
            </span>
          </div>

          {/* Main Content */}
          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default DataModal

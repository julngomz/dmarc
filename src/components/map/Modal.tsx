import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }: ModalProps) => {
  return (
    <div
      className={`${isOpen ? '' : 'hidden'} backdrop-blur-[1px] backdrop-brightness-50 absolute z-10 w-full h-full flex justify-center items-center`}>
      <div className="relative bg-white rounded-lg h-11/12 w-11/12 md:w-8/12 md:h-11/12">
        <div className="absolute top-2 right-2 left-auto">
          <button
            onClick={onClose}
            className="hover:bg-red-400 hover:text-red-100 hover:cursor-pointer rounded-full p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal

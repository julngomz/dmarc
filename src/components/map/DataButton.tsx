import { ChartColumnBig } from "lucide-react"
import clsx from "clsx"

interface DateButtonProps {
  onClick?: () => void
}

const DataButton = ({ onClick }: DateButtonProps) => {
  return (
    <button className={`
        absolute z-10 left-4 top-4 flex justify-center hover:cursor-pointer
        px-6 py-4 rounded-lg border-2 border-gray-300 gap-2 items-center bg-white
        
      `}>
      <ChartColumnBig size={18} />
      Filter Data
    </button>
  )
}

export default DataButton

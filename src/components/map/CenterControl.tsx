import { Maximize } from "lucide-react"

interface CenterControlProps {
  onClick?: () => void
}

const CenterControl: React.FC<CenterControlProps> = ({
  onClick
}: CenterControlProps) => {
  return (
    <div
      onClick={onClick}
      className="absolute hover:cursor-pointer z-10 left-auto right-2 bottom-14 md:bottom-4 md:right-4 md:left-auto p-2 bg-white rounded-full">
      <Maximize className="w-6 h-6" strokeWidth={2.5} />
    </div>
  )
}

export default CenterControl

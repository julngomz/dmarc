import { X } from 'lucide-react'

const Box = () => {
  return (
    <div className='absolute top-4 left-4 z-30 w-4/12 h-[80%] bg-white flex flex-col rounded-lg border-2 border-gray-200'>
      <span>
        <X />
      </span>
      <div className='flex flex-col'>
        Data Box
      </div>
    </div>
  )
}

export default Box

import { X, Compass, Search } from 'lucide-react'
import { Location } from '../../lib/types'
import LocationCard from './LocationModal'

import clsx from 'clsx'

interface SidebarProps {
  isOpen: boolean;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  locations: Location[];
  closeSidebar: () => void;
  openModal: (location: Location) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  sidebarRef,
  locations,
  closeSidebar,
  openModal
}) => {
  return (
    <div
      ref={sidebarRef}
      className={clsx(
        "z-30 bg-white shadow-lg transition-all duration-300 ease-in-out md:static md:h-full md:w-[360px] md:rounded-none",
        {
          'fixed inset-x-0 bottom-0 rounded-t-xl w-full h-[85vh] overflow-hidden': isOpen == true,
          'fixed inset-x-0 bottom-0 translate-y-full w-full h-[85vh]': isOpen == false,
          'md:translate-x-0 md:translate-y-0': isOpen == true,
          'md:translate-x-[-100%] md:translate-y-0': isOpen == false
        }
      )}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg text-primary">Search</h2>
          <button
            className="hover:cursor-pointer p-2 rounded-full hover:bg-gray-100"
            onClick={closeSidebar}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search location..."
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="flex hover:cursor-pointer items-center text-primary font-medium mb-4">
          <Compass size={18} className="mr-2" />
          Find a Pantry Near Me
        </button>
        <div className="mb-4">
          <label className="block text-primary font-medium mb-2" htmlFor="pantryType">
            Pantry Type
          </label>
          <div className="relative">
            <select
              id="pantryType"
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-primary px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              defaultValue="all"
            >
              <option value="all">All Pantries</option>
              <option value="in-network">In-Network</option>
              <option value="out-network">Out-of-Network</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto flex-grow mt-4">
          {locations.map(location => (
            <LocationCard
              location={location}
              onClick={() => { openModal(location) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

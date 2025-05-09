import React from 'react'
import { PantryRecord, Crumbs } from '../../lib/types'
import { SummaryStats } from '../../lib/utils/dataProcessor'
import { X } from "lucide-react"
import PieChart from "../charts/PieChart"
import DataCrumbs from "./DataCrumbs"

const dummyData = [
  {
    "id": "rust",
    "label": "rust",
    "value": 573,
    "color": "hsl(20, 70%, 50%)"
  },
  {
    "id": "javascript",
    "label": "javascript",
    "value": 457,
    "color": "hsl(41, 70%, 50%)"
  },
  {
    "id": "scala",
    "label": "scala",
    "value": 354,
    "color": "hsl(263, 70%, 50%)"
  },
  {
    "id": "css",
    "label": "css",
    "value": 178,
    "color": "hsl(130, 70%, 50%)"
  },
  {
    "id": "python",
    "label": "python",
    "value": 106,
    "color": "hsl(216, 70%, 50%)"
  }
]

interface ModalProps {
  data: PantryRecord[]
  summaryStats: SummaryStats
  crumbs: Crumbs
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({
  data,
  summaryStats,
  crumbs,
  isOpen,
  onClose
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className={` 
          ${isOpen ? '' : 'hidden'} 
          backdrop-blur-[1px] backdrop-brightness-50 absolute z-10 
          w-full h-full flex justify-center items-center 
          transition-all duration-300 ease-in
      `}>
      <div className="bg-white rounded-lg h-11/12 w-11/12 md:w-10/12 md:h-11/12 flex flex-col p-4 gap-2">
        {/* Modal Topbar */}
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-700">Data View</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
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
            <p>Demographic: {crumbs.demographic}</p>
            <p>City: {crumbs.selectedCity}</p>
            <p>Year: {crumbs.year}</p>
            <p>Month: {crumbs.month}</p>
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
                  <td className="py-2 px-4 border-b">{record.ID}</td>
                  <td className="py-2 px-4 border-b">{record.Name}</td>
                  <td className="py-2 px-4 border-b">{record.PantryLocation}</td>
                  <td className="py-2 px-4 border-b">{record.Race}</td>
                  <td className="py-2 px-4 border-b">{record.Education}</td>
                  <td className="py-2 px-4 border-b">{record.SNAP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Modal

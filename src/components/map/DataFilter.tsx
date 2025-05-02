import React, { useState, useEffect } from 'react'
import { Crumbs } from '../../lib/types'

import {
  BarChart3,
  ChevronUp,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react'

const defaultCrumbs: Crumbs = {
  demographic: "Overall",
  demographicSubcategory: "All",
  selectedCity: "Overall",
  selectedZipCode: "All",
  year: "2025",
  month: "All"
}

type ZipCode = {
  value: string
  label: string
}

type CityZipCodes = {
  [key: string]: ZipCode[]
}

const PantryLocations: string[] = [
  // Todo: Pantries
]

const DEMOGRAPHICS: string[] = [
  "Overall",
  "Age",
  "Education",
  "SNAP",
  "Race",
  "Ethnicity"
]

const CITIES = [
  "Overall",
  "Des Moines",
  "West Des Moines",
  "Ankeny",
  "Urbandale",
  "Johnston",
  "Waukee",
  "Clive",
  "Altoona",
  "Pleasant Hill",
  "Windsor Heights",
  "Grimes",
  "Bondurant"
]

const YEARS: string[] = [
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
]

const MONTHS: string[] = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

interface DataFilterProps {
  data: Crumbs
  onFilterChange: (newCrumbs: Crumbs) => void
}

const DataFilter: React.FC<DataFilterProps> = ({
  data,
  onFilterChange
}: DataFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [tempCrumbs, setTempCrumbs] = useState<Crumbs>(data)

  // Update temp values when the filter panel is opened
  useEffect(() => {
    if (isExpanded) {
      setTempCrumbs(data)
    }
  }, [isExpanded, data])

  const toggleExpand = (): void => {
    setIsExpanded(!isExpanded)
  }

  const applyFilter = (): void => {
    onFilterChange(tempCrumbs)
    setIsExpanded(false)
  }

  const resetFilter = (): void => {
    onFilterChange(defaultCrumbs)
    setIsExpanded(false)
  }

  // Define zip codes for each city
  const cityZipCodes: CityZipCodes = {
    'Overall': [{ value: 'All', label: 'All Zip Codes' }],
    'Des Moines': [
      { value: 'All', label: 'Des Moines Zip Codes' },
      { value: '50309', label: '50309 - Downtown' },
      { value: '50310', label: '50310 - Beaverdale' },
      { value: '50311', label: '50311 - Drake Area' },
      { value: '50312', label: '50312 - Western Des Moines' },
      { value: '50313', label: '50313 - Northern Des Moines' },
      { value: '50314', label: '50314 - East Des Moines' },
      { value: '50315', label: '50315 - South Des Moines' },
      { value: '50316', label: '50316 - East Des Moines' },
      { value: '50317', label: '50317 - Southeast Des Moines' }
    ],
    'West Des Moines': [
      { value: 'All', label: 'West Des Moines Zip Codes' },
      { value: '50265', label: '50265 - South West Des Moines' },
      { value: '50266', label: '50266 - North West Des Moines' }
    ],
    'Ankeny': [
      { value: 'All', label: 'Ankeny Zip Codes' },
      { value: '50021', label: '50021 - Ankeny' },
      { value: '50023', label: '50023 - Ankeny' }
    ],
    'Urbandale': [
      { value: 'All', label: 'Urbandale Zip Codes' },
      { value: '50322', label: '50322 - Urbandale' },
      { value: '50323', label: '50323 - Urbandale' }
    ],
    'Johnston': [
      { value: 'All', label: 'Johnston Zip Codes' },
      { value: '50131', label: '50131 - Johnston' }
    ],
    'Waukee': [
      { value: 'All', label: 'Waukee Zip Codes' },
      { value: '50263', label: '50263 - Waukee' }
    ],
    'Clive': [
      { value: 'All', label: 'Clive Zip Codes' },
      { value: '50325', label: '50325 - Clive' }
    ],
    'Altoona': [
      { value: 'All', label: 'Altoona Zip Codes' },
      { value: '50009', label: '50009 - Altoona' }
    ],
    'Pleasant Hill': [
      { value: 'All', label: 'Pleasant Hill Zip Codes' },
      { value: '50327', label: '50327 - Pleasant Hill' }
    ],
    'Windsor Heights': [
      { value: 'All', label: 'Windsor Heights Zip Codes' },
      { value: '50324', label: '50324 - Windsor Heights' }
    ],
    'Grimes': [
      { value: 'All', label: 'Grimes Zip Codes' },
      { value: '50111', label: '50111 - Grimes' }
    ],
    'Bondurant': [
      { value: 'All', label: 'Bondurant Zip Codes' },
      { value: '50035', label: '50035 - Bondurant' }
    ]
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-10 select-none flex flex-col gap-2 md:left-4 md:right-auto md:top-4">
      <div
        className="hidden hover:cursor-pointer items-center bg-white rounded-none md:rounded-md">
        <div className="flex items-center text-sm text-gray-700">
          <div className='bg-white p-3 text-gray-800 rounded-bl-md rounded-tl-md'>
            <BarChart3 className="h-5 w-5" />
          </div>

          <div className='flex p-3'>
            {/* Year and Month */}
            {tempCrumbs.month === 'All' ? (
              <span className="font-medium">Summary {tempCrumbs.year}</span>
            ) : (
              <>
                <span className="font-medium">{tempCrumbs.year}</span>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{tempCrumbs.month}</span>
              </>
            )}

            {/* Location */}
            {tempCrumbs.selectedCity !== 'Overall' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{tempCrumbs.selectedCity}</span>
              </>
            )}

            {/* Zip Code */}
            {tempCrumbs.selectedCity !== 'Overall' && tempCrumbs.selectedZipCode !== 'All' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{tempCrumbs.selectedZipCode}</span>
              </>
            )}

            {/* Demographic */}
            {tempCrumbs.demographic !== 'Overall' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{tempCrumbs.demographic}</span>
              </>
            )}

            {/* Demographic Subcategory */}
            {tempCrumbs.demographic !== 'Overall' && tempCrumbs.demographicSubcategory !== 'All' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{tempCrumbs.demographicSubcategory}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="px-2 md:px-0 bg-white rounded-none left-0 right-0 top-0 overflow-hidden md:rounded-md md:w-80">
        <div
          className="flex grow items-center align-center gap-1 cursor-pointer border-b border-gray-200 md:hover:bg-gray-50"
          onClick={toggleExpand}>
          <div className='p-2 bg-white'>
            <SlidersHorizontal className="w-5 h-5 m-1 text-gray-800" />
          </div>
          <div className='flex w-full justify-between p-2 items-center'>
            <span className="text-gray-800 font-medium">Filter Data</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 space-y-4">
            {/* Demographic Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Demographic</label>
              <div className="relative">
                <select
                  value={tempCrumbs.demographic}
                  onChange={(e) => {
                    setTempCrumbs(prev => ({
                      ...prev,
                      demographic: e.target.value,
                      demographicSubcategory: 'All'
                    }))
                  }}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="Overall">Overall</option>
                  <option value="Age">Age</option>
                  <option value="Race">Race</option>
                  <option value="Ethnicity">Ethnicity</option>
                  <option value="Education">Education</option>
                  <option value="SNAP Recipients">SNAP Recipients</option>
                </select>
              </div>
            </div>

            {/* Subcategory Filter - Shows based on selected demographic */}
            {tempCrumbs.demographic !== 'Overall' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{tempCrumbs.demographic} Categories</label>
                <div className="relative">
                  <select
                    value={tempCrumbs.demographicSubcategory}
                    onChange={(e) => setTempCrumbs(prev => ({
                      ...prev,
                      demographicSubcategory: e.target.value
                    }))}
                    className="block w-full px-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="All">All {tempCrumbs.demographic} Groups</option>
                    {tempCrumbs.demographic === 'Age' && (
                      <>
                        <option value="Children">Children (0-17)</option>
                        <option value="Adults">Adults (18-64)</option>
                        <option value="Seniors">Seniors (65+)</option>
                      </>
                    )}
                    {tempCrumbs.demographic === 'Race' && (
                      <>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Asian">Asian</option>
                        <option value="Native">Native American</option>
                        <option value="Other">Other/Multiple</option>
                      </>
                    )}
                    {tempCrumbs.demographic === 'Ethnicity' && (
                      <>
                        <option value="Hispanic">Hispanic/Latino</option>
                        <option value="NonHispanic">Non-Hispanic</option>
                      </>
                    )}
                    {tempCrumbs.demographic === 'Education' && (
                      <>
                        <option value="LessThanHS">Less than High School</option>
                        <option value="HSGrad">High School Graduate</option>
                        <option value="SomeCollege">Some College</option>
                        <option value="College">College Graduate</option>
                      </>
                    )}
                    {tempCrumbs.demographic === 'SNAP Recipients' && (
                      <>
                        <option value="Current">Current Recipients</option>
                        <option value="Eligible">Eligible Non-Recipients</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* Location Filters */}
            <div className="space-y-4">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <div className="relative">
                  <select
                    value={tempCrumbs.selectedCity}
                    onChange={(e) => setTempCrumbs(prev => ({
                      ...prev,
                      selectedCity: e.target.value,
                      selectedZipCode: 'All'
                    }))}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Zip Code Filter - Only show when a city is selected */}
              {tempCrumbs.selectedCity !== 'Overall' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <div className="relative">
                    <select
                      value={tempCrumbs.selectedZipCode}
                      onChange={(e) => setTempCrumbs(prev => ({
                        ...prev,
                        selectedZipCode: e.target.value
                      }))}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      {cityZipCodes[tempCrumbs.selectedCity].map((zipCode) => (
                        <option key={zipCode.value} value={zipCode.value}>
                          {zipCode.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Year and Month Filters */}
            <div className="grid grid-cols-2 gap-4">
              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <div className="relative">
                  <select
                    value={tempCrumbs.year}
                    onChange={(e) => setTempCrumbs(prev => ({
                      ...prev,
                      year: e.target.value
                    }))}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {YEARS.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Month Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <div className="relative">
                  <select
                    value={tempCrumbs.month}
                    onChange={(e) => setTempCrumbs(prev => ({
                      ...prev,
                      month: e.target.value
                    }))}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {MONTHS.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className='flex gap-2'>
              <button
                onClick={resetFilter}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Filters
              </button>
              <button
                onClick={applyFilter}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DataFilter

import React, { useState, useEffect } from 'react'
import { Crumbs } from '../../lib/types'

import {
  BarChart3,
  ChevronUp,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react'

type ZipCode = {
  value: string
  label: string
}

type CityZipCodes = {
  [key: string]: ZipCode[]
}

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
  crumbs: Crumbs
  onChange: () => void
}

const DataFilter: React.FC<DataFilterProps> = ({
  crumbs,
  onChange
}: DataFilterProps) => {
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false)

  const [isExpanded, setIsExpanded] = useState(false)
  const [demographic, setDemographic] = useState('Overall')
  const [demographicSubcategory, setDemographicSubcategory] = useState('All')
  const [selectedCity, setSelectedCity] = useState('Overall')
  const [selectedZipCode, setSelectedZipCode] = useState('All')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('All')

  // Temporary state for filter values that are only applied when clicking "Apply"
  const [tempDemographic, setTempDemographic] = useState('Overall')
  const [tempDemographicSubcategory, setTempDemographicSubcategory] = useState('All')
  const [tempSelectedCity, setTempSelectedCity] = useState('Overall')
  const [tempSelectedZipCode, setTempSelectedZipCode] = useState('All')
  const [tempYear, setTempYear] = useState('2025')
  const [tempMonth, setTempMonth] = useState('All')

  // Update temp values when the filter panel is opened
  useEffect(() => {
    if (isExpanded) {
      setTempDemographic(demographic)
      setTempDemographicSubcategory(demographicSubcategory)
      setTempSelectedCity(selectedCity)
      setTempSelectedZipCode(selectedZipCode)
      setTempYear(year)
      setTempMonth(month)
    }
  }, [isExpanded])

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

  // Function to get the current zip code label
  const getCurrentZipCodeLabel = (): string | null => {
    if (selectedCity === 'Overall' || selectedZipCode === 'All') return null
    const zipCode = cityZipCodes[selectedCity].find(zip => zip.value === selectedZipCode)
    return zipCode ? zipCode.label : null
  }

  // Reset zip code when city changes
  useEffect(() => {
    setTempSelectedZipCode('All');
  }, [tempSelectedCity])

  const toggleExpand = (): void => {
    setIsExpanded(!isExpanded);
  }

  const applyFilters = (): void => {
    // Apply all temp values to the actual state
    setDemographic(tempDemographic)
    setDemographicSubcategory(tempDemographicSubcategory)
    setSelectedCity(tempSelectedCity)
    setSelectedZipCode(tempSelectedZipCode)
    setYear(tempYear)
    setMonth(tempMonth)

    // Close the filter panel
    setIsExpanded(false)
  }

  const resetFilters = (): void => {
    // Apply all temp values to the actual state
    setDemographic("Overall")
    setDemographicSubcategory("Overall")
    setSelectedCity("Overall")
    setSelectedZipCode("All")
    setYear("2025")
    setMonth("All")

    setIsExpanded(false)
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
            {month === 'All' ? (
              <span className="font-medium">Summary {year}</span>
            ) : (
              <>
                <span className="font-medium">{year}</span>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{month}</span>
              </>
            )}

            {/* Location */}
            {selectedCity !== 'Overall' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{selectedCity}</span>
              </>
            )}

            {/* Zip Code */}
            {selectedCity !== 'Overall' && selectedZipCode !== 'All' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{selectedZipCode}</span>
              </>
            )}

            {/* Demographic */}
            {demographic !== 'Overall' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{demographic}</span>
              </>
            )}

            {/* Demographic Subcategory */}
            {demographic !== 'Overall' && demographicSubcategory !== 'All' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
                <span>{demographicSubcategory}</span>
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
                  value={tempDemographic}
                  onChange={(e) => {
                    setTempDemographic(e.target.value);
                    setTempDemographicSubcategory('All');
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
            {tempDemographic !== 'Overall' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{tempDemographic} Categories</label>
                <div className="relative">
                  <select
                    value={tempDemographicSubcategory}
                    onChange={(e) => setTempDemographicSubcategory(e.target.value)}
                    className="block w-full px-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="All">All {tempDemographic} Groups</option>
                    {tempDemographic === 'Age' && (
                      <>
                        <option value="Children">Children (0-17)</option>
                        <option value="Adults">Adults (18-64)</option>
                        <option value="Seniors">Seniors (65+)</option>
                      </>
                    )}
                    {tempDemographic === 'Race' && (
                      <>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Asian">Asian</option>
                        <option value="Native">Native American</option>
                        <option value="Other">Other/Multiple</option>
                      </>
                    )}
                    {tempDemographic === 'Ethnicity' && (
                      <>
                        <option value="Hispanic">Hispanic/Latino</option>
                        <option value="NonHispanic">Non-Hispanic</option>
                      </>
                    )}
                    {tempDemographic === 'Education' && (
                      <>
                        <option value="LessThanHS">Less than High School</option>
                        <option value="HSGrad">High School Graduate</option>
                        <option value="SomeCollege">Some College</option>
                        <option value="College">College Graduate</option>
                      </>
                    )}
                    {tempDemographic === 'SNAP Recipients' && (
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
                    value={tempSelectedCity}
                    onChange={(e) => setTempSelectedCity(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {CITIES.map(city => {
                      return <option value={city}>{city}</option>
                    })}
                  </select>
                </div>
              </div>

              {/* Zip Code Filter - Only show when a city is selected */}
              {tempSelectedCity !== 'Overall' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <div className="relative">
                    <select
                      value={tempSelectedZipCode}
                      onChange={(e) => setTempSelectedZipCode(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      {cityZipCodes[tempSelectedCity].map((zipCode) => (
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
                    value={tempYear}
                    onChange={(e) => setTempYear(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </select>
                </div>
              </div>

              {/* Month Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <div className="relative">
                  <select
                    value={tempMonth}
                    onChange={(e) => setTempMonth(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {MONTHS.map(month => {
                      return <option value={month}>{month}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className='flex gap-2'>
              <button
                onClick={resetFilters}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Filters
              </button>
              <button
                onClick={applyFilters}
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

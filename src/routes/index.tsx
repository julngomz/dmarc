import React, { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MapPlaceholder from '../components/ui/MapPlaceholder'
import Map from '../components/map/Map'
import { PantryRecord } from '../lib/types'
import { useDataQuery } from '../lib/hooks/useDataQuery'
import { defaultFilter } from '../lib/types'

import {
  getSummaryStats,
  getUniqueValues
} from '../lib/utils/dataProcessor'

interface DataResponse {
  data: PantryRecord[]
}

type SummaryField = 'overall' | 'benefitName' | 'pantryLocation' | 'snap' | 'ageRange' | 'education' | 'race'

interface SummaryStats {
  totalRecords: number;
  uniqueLocations: number;
  snapRecipients: number;
  educationLevels: Record<string, number>;
  raceDistribution: Record<string, number>;
  ageDistribution: Record<string, number>;
}

function Index() {
  const [data, setData] = useState<PantryRecord[]>([])
  const [filter, setFilter] = useState<Partial<PantryRecord>>(defaultFilter)
  const [filteredData, setFilteredData] = useState<PantryRecord[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [selectedZipCode, setSelectedZipCode] = useState<string>('All')
  const [zipCodes, setZipCodes] = useState<string[]>([])
  const [selectedField, setSelectedField] = useState<SummaryField>('overall')
  const [fieldSummary, setFieldSummary] = useState<Record<string, number>>({})
  const [summaryStats, setSummaryStats] = useState<SummaryStats>({
    totalRecords: 0,
    uniqueLocations: 0,
    snapRecipients: 0,
    educationLevels: {},
    raceDistribution: {},
    ageDistribution: {}
  })

  const { data: jsonData, isLoading, error } = useDataQuery<DataResponse>('/data/032025PND.json')

  // Extract unique values when data is loaded
  useEffect(() => {
    if (jsonData?.data) {
      setData(jsonData.data)
      setFilteredData(jsonData.data)

      // Extract unique zipcodes
      const uniqueZipCodes = Array.from(new Set(jsonData.data.map(record => record.zipCode)))
        .filter(Boolean)
        .sort()
      setZipCodes(uniqueZipCodes)
    }
  }, [jsonData])

  // Update summary when zipcode or field changes
  useEffect(() => {
    if (!data.length) return;

    const records = selectedZipCode === 'All'
      ? data
      : data.filter(record => record.zipCode === selectedZipCode);

    if (selectedField === 'overall') {
      // Calculate overall summary statistics
      const stats: SummaryStats = {
        totalRecords: records.length,
        uniqueLocations: new Set(records.map(r => r.pantryLocation)).size,
        snapRecipients: records.filter(r => r.snap === 'Yes').length,
        educationLevels: {},
        raceDistribution: {},
        ageDistribution: {}
      };

      // Calculate distributions
      records.forEach(record => {
        if (record.education) {
          stats.educationLevels[record.education] = (stats.educationLevels[record.education] || 0) + 1;
        }
        if (record.race) {
          stats.raceDistribution[record.race] = (stats.raceDistribution[record.race] || 0) + 1;
        }
        if (record.ageRange) {
          stats.ageDistribution[record.ageRange] = (stats.ageDistribution[record.ageRange] || 0) + 1;
        }
      });

      setSummaryStats(stats);
    } else {
      // Calculate field-specific summary
      const summary = records.reduce((acc, record) => {
        const value = record[selectedField];
        if (value) {
          acc[value] = (acc[value] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      setFieldSummary(summary);
    }
  }, [selectedZipCode, selectedField, data]);

  if (isLoading) return <MapPlaceholder />
  if (error) return <div>Error loading data</div>
  if (!jsonData!.data.length) return <div>Error loading json data: {error}</div>

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newZipCode = e.target.value
    setSelectedZipCode(newZipCode)
    setFilter(prev => ({
      ...prev,
      zipCode: newZipCode
    }))
  }

  const handleMapZipCodeSelect = (zipCode: string) => {
    setSelectedZipCode(zipCode)
    setFilter(prev => ({
      ...prev,
      zipCode: zipCode
    }))
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(e.target.value as SummaryField)
  }

  const renderSummary = () => {
    if (selectedField === 'overall') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800">Total</h4>
              <p className="text-2xl font-bold text-blue-900">{summaryStats.totalRecords}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-green-800">Unique Locations</h4>
              <p className="text-2xl font-bold text-green-900">{summaryStats.uniqueLocations}</p>
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-purple-800">SNAP Recipients</h4>
            <p className="text-2xl font-bold text-purple-900">{summaryStats.snapRecipients}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Education Levels</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              {Object.entries(summaryStats.educationLevels).map(([level, count]) => (
                <div key={level} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                  <span className="text-gray-600">{level}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Race Distribution</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              {Object.entries(summaryStats.raceDistribution).map(([race, count]) => (
                <div key={race} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                  <span className="text-gray-600">{race}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Age Distribution</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              {Object.entries(summaryStats.ageDistribution).map(([age, count]) => (
                <div key={age} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                  <span className="text-gray-600">{age}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 rounded-lg p-4">
        {Object.entries(fieldSummary).map(([value, count]) => (
          <div key={value} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
            <span className="text-gray-600">{value}</span>
            <span className="font-medium">{count}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-[calc(100vh-4rem)]">
      <div className="order-1 md:order-2 w-full md:w-8/12 h-1/2 md:h-full relative">
        <Map
          data={filteredData}
          selectedZipCode={selectedZipCode}
          onZipCodeSelect={handleMapZipCodeSelect}
        />
      </div>

      <div className=" order-2 md:order-1 w-full md:w-4/12 h-1/2 md:h-full bg-white shadow-lg overflow-y-auto p-4">
        <div className="flex gap-4">
          {/* Zip Code Filter */}
          <div className='grow'>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <select
              id="zipCode"
              value={selectedZipCode}
              onChange={handleZipCodeChange}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="All">All Zip Codes</option>
              {zipCodes.map((zip) => (
                <option key={zip} value={zip}>
                  {zip}
                </option>
              ))}
            </select>
          </div>

          {/* Field Selection Dropdown */}
          <div className="grow">
            <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
              Summary Field
            </label>
            <select
              id="field"
              value={selectedField}
              onChange={handleFieldChange}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="overall">Overall Summary</option>
              <option value="benefitName">Benefit Name</option>
              <option value="pantryLocation">Pantry Location</option>
              <option value="snap">SNAP</option>
              <option value="ageRange">Age Range</option>
              <option value="education">Education</option>
              <option value="race">Race</option>
            </select>
          </div>
        </div>
        {/* Summary Display */}
        <div className="mt-6">
          {renderSummary()}
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index
})

"use client"

import { useState, useEffect } from "react"
import PropertyCard from "../components/PropertyCard"
import { getProperties } from "../api/api"
import { Building, Filter, Search, X } from "lucide-react"

const PropertyList = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties()
        setProperties(data)
        setFilteredProperties(data)
      } catch (err) {
        setError("Failed to fetch properties")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  useEffect(() => {
    // Apply filters
    let result = [...properties]

    if (filters.type) {
      result = result.filter((property) => property.type === filters.type)
    }

    if (filters.minPrice) {
      result = result.filter((property) => property.price >= Number(filters.minPrice))
    }

    if (filters.maxPrice) {
      result = result.filter((property) => property.price <= Number(filters.maxPrice))
    }

    if (filters.bedrooms) {
      result = result.filter((property) => property.bedrooms >= Number(filters.bedrooms))
    }

    if (filters.bathrooms) {
      result = result.filter((property) => property.bathrooms >= Number(filters.bathrooms))
    }

    setFilteredProperties(result)
  }, [filters, properties])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const clearFilters = () => {
    setFilters({
      type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
    })
  }

  const isFiltersActive = Object.values(filters).some((value) => value !== "")

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-red-200 mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-red-600 p-8 bg-red-50 rounded-lg shadow-sm">
          <p className="text-xl font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
          Browse Properties
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">Find your perfect property from our extensive collection</p>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          {showFilters ? <X size={18} /> : <Filter size={18} />}
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Section */}
      <div
        className={`bg-white p-6 rounded-xl shadow-md mb-8 transition-all duration-300 ${showFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden md:max-h-[1000px] md:opacity-100"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Filter size={20} className="text-red-600" />
            Filter Properties
          </h2>
          {isFiltersActive && (
            <button
              onClick={clearFilters}
              className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
            >
              <X size={16} />
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Property Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Min ₹"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Max ₹"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Min Bedrooms</label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Min Bathrooms</label>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={clearFilters}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors mr-4"
          >
            Reset
          </button>
          <button
            onClick={() => setShowFilters(false)}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors md:hidden"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Search size={18} className="text-gray-500" />
          <p className="text-gray-700 font-medium">
            <span className="text-red-600 font-semibold">{filteredProperties.length}</span> properties found
          </p>
        </div>
        {isFiltersActive && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Filters applied</span>
            <button onClick={clearFilters} className="text-red-600 hover:text-red-800 font-medium">
              Clear
            </button>
          </div>
        )}
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <Building size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-700 text-xl font-medium mb-2">No properties match your filters</p>
          <p className="text-gray-500 mb-8">Try adjusting your search criteria to find more options</p>
          <button
            onClick={clearFilters}
            className="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProperties.map((property, index) => (
            <div key={property._id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.05}s` }}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PropertyList

"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import PropertyForm from "../components/PropertyForm"
import { getPropertyById, updateProperty } from "../api/api"
import { ArrowLeft, Building, Edit } from "lucide-react"

const EditProperty = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id)
        setProperty(data)
      } catch (err) {
        setError("Failed to fetch property details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  const handleSubmit = async (propertyData) => {
    try {
      await updateProperty(id, propertyData)
      navigate(`/properties/${id}`)
    } catch (error) {
      console.error("Error updating property:", error)
      alert("Failed to update property. Please try again.")
    }
  }

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

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <Building size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl font-medium text-gray-700 mb-4">Property not found</p>
          <Link
            to="/admin"
            className="text-red-600 hover:text-red-700 transition-colors font-medium flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={16} />
            Back to Admin Panel
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-medium">Back to Admin Panel</span>
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
          Edit Property
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">Update the property information below</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6 text-blue-600">
            <Edit size={24} />
            <h2 className="text-xl font-semibold">Edit Property Information</h2>
          </div>
          <PropertyForm
            property={property}
            onSubmit={handleSubmit}
            buttonText={
              <span className="flex items-center justify-center gap-2">
                <Edit size={18} />
                Update Property
              </span>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default EditProperty

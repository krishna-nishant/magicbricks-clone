"use client"

import { useNavigate } from "react-router-dom"
import PropertyForm from "../components/PropertyForm"
import { createProperty } from "../api/api"
import { Building, Plus } from "lucide-react"

const AddProperty = () => {
  const navigate = useNavigate()

  const handleSubmit = async (propertyData) => {
    try {
      const newProperty = await createProperty(propertyData)
      navigate(`/properties/${newProperty._id}`)
    } catch (error) {
      console.error("Error creating property:", error)
      alert("Failed to create property. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
          Add New Property
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Fill in the details below to add a new property to the marketplace
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6 text-red-600">
            <Building size={24} />
            <h2 className="text-xl font-semibold">Property Information</h2>
          </div>
          <PropertyForm
            onSubmit={handleSubmit}
            buttonText={
              <span className="flex items-center justify-center gap-2">
                <Plus size={18} />
                Add Property
              </span>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default AddProperty

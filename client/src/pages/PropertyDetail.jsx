"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getPropertyById, deleteProperty } from "../api/api"
import { ArrowLeft, Bath, Bed, Building, Calendar, Edit, MapPin, Ruler, Trash2 } from "lucide-react"

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

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

  const handleDelete = async () => {
    try {
      await deleteProperty(id)
      navigate("/properties")
    } catch (err) {
      setError("Failed to delete property")
      console.error(err)
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
            to="/properties"
            className="text-red-600 hover:text-red-700 transition-colors font-medium flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={16} />
            Back to Properties
          </Link>
        </div>
      </div>
    )
  }

  const { title, price, location, description, type, bedrooms, bathrooms, area, amenities, images, createdAt } =
    property

  // Default image if no images are available
  const propertyImages = images && images.length > 0 ? images : ["https://via.placeholder.com/800x500?text=No+Image"]

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <Link
        to="/properties"
        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors mb-6 group"
      >
        <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-medium">Back to All Properties</span>
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-[500px]">
          <img
            src={propertyImages[activeImageIndex] || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {propertyImages.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ArrowLeft size={20} className="transform rotate-180" />
              </button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {propertyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeImageIndex ? "bg-white w-6" : "bg-white/50"}`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Property Info */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">{type}</span>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{location}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">{title}</h1>
            </div>
            <div className="bg-red-50 px-6 py-4 rounded-lg">
              <p className="text-3xl font-bold text-red-600">₹{price.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <Bed size={20} className="text-red-600" />
                <span className="font-semibold text-lg">{bedrooms}</span>
              </div>
              <p className="text-gray-500 text-sm">Bedrooms</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <Bath size={20} className="text-red-600" />
                <span className="font-semibold text-lg">{bathrooms}</span>
              </div>
              <p className="text-gray-500 text-sm">Bathrooms</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <Ruler size={20} className="text-red-600" />
                <span className="font-semibold text-lg">{area}</span>
              </div>
              <p className="text-gray-500 text-sm">Square Feet</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <Calendar size={20} className="text-red-600" />
                <span className="font-semibold text-lg">
                  {new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <p className="text-gray-500 text-sm">Listed On</p>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{description}</p>
          </div>

          {amenities && amenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {amenities.map((amenity, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Admin Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <Link
              to={`/admin/edit/${id}`}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Edit size={18} />
              Edit Property
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Delete Property
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
            <h3 className="text-2xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetail

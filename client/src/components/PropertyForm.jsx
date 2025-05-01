"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, X } from "lucide-react"

const PropertyForm = ({ property, onSubmit, buttonText = "Submit" }) => {
  const initialState = {
    title: "",
    description: "",
    type: "Apartment",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: "",
    images: "",
    featured: false,
  }

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formTouched, setFormTouched] = useState(false)

  useEffect(() => {
    if (property) {
      // Convert arrays to comma-separated strings for the form
      setFormData({
        ...property,
        amenities: property.amenities ? property.amenities.join(", ") : "",
        images: property.images ? property.images.join(", ") : "",
      })
    }
  }, [property])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
    setFormTouched(true)
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.title) newErrors.title = "Title is required"
    if (!formData.description) newErrors.description = "Description is required"
    if (!formData.type) newErrors.type = "Property type is required"
    if (!formData.price) newErrors.price = "Price is required"
    else if (isNaN(formData.price)) newErrors.price = "Price must be a number"
    if (!formData.location) newErrors.location = "Location is required"
    if (!formData.bedrooms) newErrors.bedrooms = "Number of bedrooms is required"
    else if (isNaN(formData.bedrooms)) newErrors.bedrooms = "Bedrooms must be a number"
    if (!formData.bathrooms) newErrors.bathrooms = "Number of bathrooms is required"
    else if (isNaN(formData.bathrooms)) newErrors.bathrooms = "Bathrooms must be a number"
    if (!formData.area) newErrors.area = "Area is required"
    else if (isNaN(formData.area)) newErrors.area = "Area must be a number"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      // Process the data before submitting
      const processedData = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        amenities: formData.amenities ? formData.amenities.split(",").map((item) => item.trim()) : [],
        images: formData.images ? formData.images.split(",").map((item) => item.trim()) : [],
      }

      await onSubmit(processedData)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.title ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            placeholder="Enter property title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <X size={14} />
              {errors.title}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.description ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            placeholder="Describe the property"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <X size={14} />
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Property Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.type ? "border-red-500 bg-red-50" : "border-gray-300"}`}
          >
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <X size={14} />
              {errors.type}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Price (₹)</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.price ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <X size={14} />
              {errors.price}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.location ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <X size={14} />
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Bedrooms</label>
          <input
            type="text"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.bedrooms ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            placeholder="Number of bedrooms"
          />
          {errors.bedrooms && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <X size={14} />
              {errors.bedrooms}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Bathrooms</label>
          <input
            type="text"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.bathrooms ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            placeholder="Number of bathrooms"
          />
          {errors.bathrooms && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <X size={14} />
              {errors.bathrooms}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Area (sq.ft)</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.area ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            placeholder="Area in square feet"
          />
          {errors.area && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <X size={14} />
              {errors.area}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center text-gray-700 text-sm font-medium mb-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mr-2 h-5 w-5 text-red-600 rounded focus:ring-red-500 cursor-pointer"
            />
            Featured Property
          </label>
          <p className="text-gray-500 text-xs">Featured properties appear on the homepage</p>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Amenities (comma-separated)</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="AC, Gym, Swimming Pool, etc."
            className="w-full p-3 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-gray-500 text-xs mt-1">Separate multiple amenities with commas</p>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Image URLs (comma-separated)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            className="w-full p-3 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-gray-500 text-xs mt-1">Separate multiple image URLs with commas</p>
        </div>

        <div className="col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="py-3 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>{typeof buttonText === "string" ? buttonText : buttonText}</>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PropertyForm

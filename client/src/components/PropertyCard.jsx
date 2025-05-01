import { Link } from "react-router-dom"
import { Bath, Bed, MapPin, Ruler } from "lucide-react"

const PropertyCard = ({ property }) => {
  const { _id, title, price, location, type, bedrooms, bathrooms, area, images, featured } = property

  // Default image if no images are available
  const imageUrl = images && images.length > 0 ? images[0] : "https://via.placeholder.com/300x200?text=No+Image"

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {featured && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
          {type}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <MapPin size={14} />
          <span className="truncate">{location}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-red-600 font-bold text-xl mb-4">₹{price.toLocaleString()}</p>

        <div className="flex justify-between text-sm text-gray-600 mb-4 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1">
            <Bed size={16} className="text-gray-400" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} className="text-gray-400" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={16} className="text-gray-400" />
            <span>{area} sq.ft</span>
          </div>
        </div>

        <Link
          to={`/properties/${_id}`}
          className="block w-full text-center bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors group-hover:shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default PropertyCard

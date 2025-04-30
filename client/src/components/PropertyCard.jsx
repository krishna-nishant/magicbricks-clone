import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const { _id, title, price, location, type, bedrooms, bathrooms, area, images } = property;
  
  // Default image if no images are available
  const imageUrl = images && images.length > 0 
    ? images[0] 
    : 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{location}</p>
        <p className="text-red-600 font-bold text-xl mb-3">₹{price.toLocaleString()}</p>
        
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{bedrooms} Beds</span>
          <span>{bathrooms} Baths</span>
          <span>{area} sq.ft</span>
          <span>{type}</span>
        </div>
        
        <Link 
          to={`/properties/${_id}`} 
          className="block w-full text-center bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard; 
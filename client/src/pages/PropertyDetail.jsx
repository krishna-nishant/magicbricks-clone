import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPropertyById, deleteProperty } from '../api/api';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError('Failed to fetch property details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProperty(id);
      navigate('/properties');
    } catch (err) {
      setError('Failed to delete property');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl">Property not found</p>
          <Link to="/properties" className="text-red-600 mt-4 hover:underline">Back to Properties</Link>
        </div>
      </div>
    );
  }

  const { 
    title, 
    price, 
    location, 
    description, 
    type, 
    bedrooms, 
    bathrooms, 
    area, 
    amenities, 
    images, 
    createdAt 
  } = property;

  // Default image if no images are available
  const propertyImages = images && images.length > 0 
    ? images 
    : ['https://via.placeholder.com/800x500?text=No+Image'];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/properties" className="text-red-600 hover:underline mb-4 inline-block">
        &larr; Back to All Properties
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="relative">
          <img 
            src={propertyImages[activeImageIndex]} 
            alt={title} 
            className="w-full h-[400px] object-cover"
          />
          
          {propertyImages.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {propertyImages.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === activeImageIndex ? 'bg-red-600' : 'bg-white bg-opacity-70'}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Property Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
              <p className="text-gray-600 mt-1">{location}</p>
            </div>
            <p className="text-2xl font-bold text-red-600">₹{price.toLocaleString()}</p>
          </div>
          
          <div className="flex flex-wrap gap-6 mb-6 text-gray-700">
            <div className="flex items-center">
              <span className="font-semibold mr-2">{bedrooms}</span> Bedrooms
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">{bathrooms}</span> Bathrooms
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">{area}</span> sq.ft
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">{type}</span>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>
          
          {amenities && amenities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-gray-500 text-sm mb-6">
            Listed on {new Date(createdAt).toLocaleDateString()}
          </div>
          
          {/* Admin Actions */}
          <div className="flex space-x-4">
            <Link 
              to={`/admin/edit/${id}`} 
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Edit Property
            </Link>
            <button 
              onClick={() => setShowDeleteConfirm(true)} 
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Delete Property
            </button>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this property? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail; 
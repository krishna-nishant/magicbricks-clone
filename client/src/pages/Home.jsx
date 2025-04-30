import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../api/api';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
        
        // Filter featured properties
        const featured = data.filter(property => property.featured);
        setFeaturedProperties(featured.slice(0, 4)); // Get first 4 featured properties
        
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl">Loading properties...</p>
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

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="text-xl mb-8">Discover the perfect property with MagicBricks</p>
          <Link 
            to="/properties" 
            className="bg-white text-red-600 py-3 px-8 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
        
        {featuredProperties.length === 0 ? (
          <p className="text-center text-gray-600">No featured properties available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            to="/properties" 
            className="inline-block bg-red-600 text-white py-3 px-8 rounded-md font-semibold hover:bg-red-700 transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose MagicBricks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-red-600 text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-3">Premium Selection</h3>
              <p className="text-gray-600">Handpicked premium properties verified by our experts.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-red-600 text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Trusted Partners</h3>
              <p className="text-gray-600">We work with the best agents and builders in the industry.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-red-600 text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
              <p className="text-gray-600">Get advice from our experts at every step of your journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
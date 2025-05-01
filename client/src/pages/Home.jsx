"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PropertyCard from "../components/PropertyCard"
import { getProperties } from "../api/api"
import { ArrowRight, Building, HomeIcon, Search, Shield, Star } from "lucide-react"

const Home = () => {
  const [properties, setProperties] = useState([])
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties()
        setProperties(data)

        // Filter featured properties
        const featured = data.filter((property) => property.featured)
        setFeaturedProperties(featured.slice(0, 4)) // Get first 4 featured properties
      } catch (err) {
        setError("Failed to fetch properties")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

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
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-red-800/70"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your <span className="text-yellow-300">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-100">
            Discover the perfect property with MagicBricks - Your trusted partner in real estate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="bg-white text-red-600 py-3 px-8 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group"
            >
              <Search size={18} />
              Browse Properties
              <ArrowRight
                size={18}
                className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
              />
            </Link>
            <Link
              to="/admin"
              className="bg-transparent text-white border-2 border-white py-3 px-8 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Admin Panel
            </Link>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-gray-50">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            Featured Properties
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Explore our handpicked selection of premium properties that stand out for their exceptional features and
            value
          </p>
        </div>

        {featuredProperties.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Building size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No featured properties available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back soon or browse all properties.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProperties.map((property, index) => (
              <div key={property._id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-red-600 text-white py-3 px-8 rounded-md font-semibold hover:bg-red-700 transition-all duration-300 transform hover:translate-y-[-2px] shadow-md group"
          >
            View All Properties
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              Why Choose MagicBricks
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              We're committed to helping you find the perfect property with confidence and ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-6">
                <Star size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Selection</h3>
              <p className="text-gray-600">
                Handpicked premium properties verified by our experts to ensure quality and value.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-6">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trusted Partners</h3>
              <p className="text-gray-600">
                We work with the best agents and builders in the industry to provide reliable options.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-6">
                <HomeIcon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Guidance</h3>
              <p className="text-gray-600">
                Get personalized advice from our experts at every step of your property journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our extensive collection of properties and find the perfect match for your needs and budget.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-white text-red-600 py-3 px-8 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Browsing
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home

"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Building, Home, Menu, Search, X } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Building className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold">
              <span className="text-red-600">Magic</span>
              <span className="text-gray-800">Bricks</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium ${
                isActive("/") ? "text-red-600 border-b-2 border-red-600 pb-1" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className={`text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium ${
                isActive("/properties") ? "text-red-600 border-b-2 border-red-600 pb-1" : ""
              }`}
            >
              Properties
            </Link>
            <Link
              to="/admin"
              className={`text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium ${
                isActive("/admin") ? "text-red-600 border-b-2 border-red-600 pb-1" : ""
              }`}
            >
              Admin
            </Link>
          </div>

          {/* Search Button */}
          <div className="hidden md:flex">
            <Link
              to="/properties"
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center gap-2"
            >
              <Search size={18} />
              Search Properties
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-red-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slideDown">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className={`block py-2 px-4 rounded-lg ${
                isActive("/") ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-50"
              } transition-colors duration-300 flex items-center gap-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              Home
            </Link>
            <Link
              to="/properties"
              className={`block py-2 px-4 rounded-lg ${
                isActive("/properties") ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-50"
              } transition-colors duration-300 flex items-center gap-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Search size={18} />
              Properties
            </Link>
            <Link
              to="/admin"
              className={`block py-2 px-4 rounded-lg ${
                isActive("/admin") ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-50"
              } transition-colors duration-300 flex items-center gap-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Building size={18} />
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

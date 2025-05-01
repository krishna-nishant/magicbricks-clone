import { Link } from "react-router-dom"
import { Home } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 animate-fadeIn">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-red-600/10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-red-600">404</div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:translate-y-[-2px] shadow-md"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-red-200 rounded-full opacity-50 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-red-100 rounded-full opacity-50 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-red-300 rounded-full opacity-50 animate-float delay-200"></div>
    </div>
  )
}

export default NotFound

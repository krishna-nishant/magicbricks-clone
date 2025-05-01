import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import PropertyList from "./pages/PropertyList"
import PropertyDetail from "./pages/PropertyDetail"
import AdminPanel from "./pages/AdminPanel"
import AddProperty from "./pages/AddProperty"
import EditProperty from "./pages/EditProperty"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/add" element={<AddProperty />} />
            <Route path="/admin/edit/:id" element={<EditProperty />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-red-500">Magic</span>Bricks
                </h3>
                <p className="text-gray-300">Find your perfect property with us.</p>
              </div>
              <div className="mb-8 md:mb-0">
                <h4 className="text-lg font-semibold mb-4 text-gray-100">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/"
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-red-500"></span>Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/properties"
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-red-500"></span>
                      Properties
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin"
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-red-500"></span>Admin
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-100">Contact Us</h4>
                <address className="text-gray-300 not-italic space-y-2">
                  <p>123 Real Estate Road</p>
                  <p>Mumbai, India</p>
                  <p className="hover:text-white transition-colors duration-300">info@magicbricks-clone.com</p>
                </address>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} MagicBricks. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

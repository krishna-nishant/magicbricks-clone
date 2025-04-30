import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import AdminPanel from './pages/AdminPanel';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
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
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4">MagicBricks</h3>
                <p className="text-gray-400">Find your perfect property with us.</p>
              </div>
              <div className="mb-6 md:mb-0">
                <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                  <li><a href="/properties" className="text-gray-400 hover:text-white">Properties</a></li>
                  <li><a href="/admin" className="text-gray-400 hover:text-white">Admin</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
                <address className="text-gray-400 not-italic">
                  123 Real Estate Road<br />
                  Mumbai, India<br />
                  info@magicbricks-clone.com
                </address>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} MagicBricks. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

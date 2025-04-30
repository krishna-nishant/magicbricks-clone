import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600">MagicBricks</Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-red-600">Home</Link>
          <Link to="/properties" className="text-gray-700 hover:text-red-600">Properties</Link>
          <Link to="/admin" className="text-gray-700 hover:text-red-600">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
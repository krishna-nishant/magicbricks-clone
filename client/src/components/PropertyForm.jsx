import { useState, useEffect } from 'react';

const PropertyForm = ({ property, onSubmit, buttonText = 'Submit' }) => {
  const initialState = {
    title: '',
    description: '',
    type: 'Apartment',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    amenities: '',
    images: '',
    featured: false
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (property) {
      // Convert arrays to comma-separated strings for the form
      setFormData({
        ...property,
        amenities: property.amenities ? property.amenities.join(', ') : '',
        images: property.images ? property.images.join(', ') : '',
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.type) newErrors.type = 'Property type is required';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (isNaN(formData.price)) newErrors.price = 'Price must be a number';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.bedrooms) newErrors.bedrooms = 'Number of bedrooms is required';
    else if (isNaN(formData.bedrooms)) newErrors.bedrooms = 'Bedrooms must be a number';
    if (!formData.bathrooms) newErrors.bathrooms = 'Number of bathrooms is required';
    else if (isNaN(formData.bathrooms)) newErrors.bathrooms = 'Bathrooms must be a number';
    if (!formData.area) newErrors.area = 'Area is required';
    else if (isNaN(formData.area)) newErrors.area = 'Area must be a number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    // Process the data before submitting
    const processedData = {
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      amenities: formData.amenities ? formData.amenities.split(',').map(item => item.trim()) : [],
      images: formData.images ? formData.images.split(',').map(item => item.trim()) : []
    };

    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Property Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Price (₹)</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Bedrooms</label>
          <input
            type="text"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Bathrooms</label>
          <input
            type="text"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Area (sq.ft)</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.area ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
        </div>

        <div>
          <label className="flex items-center text-gray-700 mb-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mr-2"
            />
            Featured Property
          </label>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Amenities (comma-separated)</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="AC, Gym, Swimming Pool, etc."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Image URLs (comma-separated)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertyForm; 
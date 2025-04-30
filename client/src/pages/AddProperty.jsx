import { useNavigate } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import { createProperty } from '../api/api';

const AddProperty = () => {
  const navigate = useNavigate();

  const handleSubmit = async (propertyData) => {
    try {
      const newProperty = await createProperty(propertyData);
      navigate(`/properties/${newProperty._id}`);
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Failed to create property. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Property</h1>
      
      <div className="max-w-4xl mx-auto">
        <PropertyForm onSubmit={handleSubmit} buttonText="Add Property" />
      </div>
    </div>
  );
};

export default AddProperty; 
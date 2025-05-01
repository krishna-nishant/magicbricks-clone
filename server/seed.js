import mongoose from 'mongoose';
import Property from './models/propertyModel.js';
import { connectDB } from './config/config.js';

// Mock property data
const properties = [
  {
    title: "Luxury 3BHK Apartment in Bandra",
    description: "Stunning sea-facing luxury apartment with modern amenities. This spacious 3BHK includes a modular kitchen, premium flooring, and ample natural light throughout. Perfect for families looking for an upscale urban lifestyle.",
    type: "Apartment",
    price: 9500000,
    location: "Bandra West, Mumbai",
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
    ],
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup", "Kids Play Area"],
    featured: true
  },
  {
    title: "Modern 2BHK Flat near Tech Park",
    description: "Well-designed 2BHK apartment near major IT hubs. Features contemporary interiors, quality fittings, and a functional layout. Includes covered parking and access to community amenities.",
    type: "Apartment",
    price: 5200000,
    location: "Whitefield, Bangalore",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: [
      "https://images.unsplash.com/photo-1580216143794-df1ebd692fa7",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    ],
    amenities: ["Covered Parking", "Fitness Center", "Community Hall", "Garden"],
    featured: false
  },
  {
    title: "Spacious 4BHK Villa with Garden",
    description: "Elegant 4BHK villa in a gated community with private garden. Featuring high ceilings, premium finishes, and custom woodwork throughout. Includes a home office, entertainment room, and outdoor patio area.",
    type: "Villa",
    price: 18000000,
    location: "Jubilee Hills, Hyderabad",
    bedrooms: 4,
    bathrooms: 4.5,
    area: 3200,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ],
    amenities: ["Private Garden", "Swimming Pool", "Home Theatre", "Modular Kitchen", "Security System"],
    featured: true
  },
  {
    title: "1BHK Budget Apartment near Metro",
    description: "Affordable 1BHK apartment with excellent connectivity. Located just 5 minutes from the metro station, this compact unit offers functional living space with essential amenities.",
    type: "Apartment",
    price: 2800000,
    location: "Noida Extension, Delhi NCR",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
    ],
    amenities: ["Security", "Power Backup", "Community Park"],
    featured: false
  },
  {
    title: "Premium 3BHK House with Terrace",
    description: "Beautiful 3BHK independent house with spacious rooms and a private terrace. Features include quality construction, thoughtful design, and excellent ventilation. Ideal for growing families.",
    type: "House",
    price: 7500000,
    location: "Viman Nagar, Pune",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
    ],
    amenities: ["Private Terrace", "Garden", "Parking", "CCTV Security"],
    featured: true
  },
  {
    title: "Commercial Office Space in Business District",
    description: "Prime commercial office space in the heart of the business district. Features modern infrastructure, high-speed internet connectivity, and professional environment. Ideal for startups and growing companies.",
    type: "Commercial",
    price: 12500000,
    location: "Cyber City, Gurugram",
    bedrooms: 0,
    bathrooms: 2,
    area: 2200,
    images: [
      "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      "https://images.unsplash.com/photo-1604328471151-2221a5057a1f"
    ],
    amenities: ["24/7 Access", "Conference Room", "Pantry", "Parking", "Air Conditioning"],
    featured: false
  },
  {
    title: "2BHK Apartment with Lake View",
    description: "Serene 2BHK apartment overlooking a picturesque lake. Features include large windows, balcony access from multiple rooms, and contemporary design. Perfect for those seeking tranquility within the city.",
    type: "Apartment",
    price: 6800000,
    location: "OMR, Chennai",
    bedrooms: 2,
    bathrooms: 2,
    area: 1350,
    images: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    ],
    amenities: ["Lake View", "Clubhouse", "Gym", "Swimming Pool", "Indoor Games"],
    featured: true
  },
  {
    title: "Luxury 5BHK Penthouse",
    description: "Exclusive penthouse with panoramic city views. This 5BHK duplex features premium imported materials, designer lighting, and custom interiors. Includes private elevator access and rooftop entertainment area.",
    type: "Apartment",
    price: 42000000,
    location: "South Mumbai, Mumbai",
    bedrooms: 5,
    bathrooms: 5.5,
    area: 4500,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1574643156929-51fa098b0394"
    ],
    amenities: ["Private Elevator", "Infinity Pool", "Home Automation", "Jacuzzi", "Concierge Service"],
    featured: true
  },
  {
    title: "3BHK Row House in Gated Community",
    description: "Elegant 3BHK row house with modern aesthetics and quality construction. Features include a small garden area, dedicated parking, and access to community amenities. Perfect for family living.",
    type: "House",
    price: 8500000,
    location: "Wakad, Pune",
    bedrooms: 3,
    bathrooms: 3,
    area: 1650,
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126"
    ],
    amenities: ["Garden", "Community Pool", "Clubhouse", "Children's Play Area"],
    featured: false
  },
  {
    title: "2BHK Apartment in High-rise Building",
    description: "Modern 2BHK apartment on the 15th floor with stunning city views. Features include contemporary design, quality finishes, and an open-concept layout. Building offers comprehensive amenities for residents.",
    type: "Apartment",
    price: 5500000,
    location: "Electronic City, Bangalore",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    images: [
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858"
    ],
    amenities: ["City View", "Gym", "Swimming Pool", "Jogging Track", "Multipurpose Hall"],
    featured: false
  },
  {
    title: "Retail Space in Shopping Complex",
    description: "Prime retail space in a busy shopping complex with high footfall. Excellent visibility and access make this ideal for retail businesses. Includes dedicated utilities and storage area.",
    type: "Commercial",
    price: 15000000,
    location: "MG Road, Delhi",
    bedrooms: 0,
    bathrooms: 1,
    area: 950,
    images: [
      "https://images.unsplash.com/photo-1582037928769-51d5274707f7",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76"
    ],
    amenities: ["High Footfall", "Parking", "Security", "Backup Power"],
    featured: false
  },
  {
    title: "4BHK Luxury Villa with Pool",
    description: "Magnificent 4BHK villa with private swimming pool and landscaped garden. Features Mediterranean-inspired architecture, high-end finishes, and spacious entertainment areas. Perfect for luxury living.",
    type: "Villa",
    price: 35000000,
    location: "ECR, Chennai",
    bedrooms: 4,
    bathrooms: 4.5,
    area: 3800,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
    ],
    amenities: ["Private Pool", "Garden", "Home Theater", "Smart Home System", "Outdoor Kitchen"],
    featured: true
  },
  {
    title: "Studio Apartment for Singles/Couples",
    description: "Cozy studio apartment ideal for singles or couples. Efficiently designed with multipurpose areas and modern fixtures. Located in a vibrant neighborhood with excellent amenities.",
    type: "Apartment",
    price: 3200000,
    location: "Indiranagar, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    ],
    amenities: ["Gym", "Rooftop Garden", "Work Space", "Security"],
    featured: false
  },
  {
    title: "3BHK Apartment with Golf Course View",
    description: "Premium 3BHK apartment overlooking a lush golf course. Features high-quality finishes, spacious balconies, and an elegant layout. Building offers extensive luxury amenities for residents.",
    type: "Apartment",
    price: 11500000,
    location: "DLF Golf Course Road, Gurugram",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 2150,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1"
    ],
    amenities: ["Golf Course View", "Swimming Pool", "Spa", "Tennis Court", "Concierge"],
    featured: true
  },
  {
    title: "2BHK Independent House with Garden",
    description: "Charming 2BHK independent house with a private garden. Features traditional elements combined with modern amenities. Offers privacy and space for comfortable family living.",
    type: "House",
    price: 4800000,
    location: "Tambaram, Chennai",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: [
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8"
    ],
    amenities: ["Garden", "Car Parking", "Solar Water Heater", "Security"],
    featured: false
  }
];

// Connect to MongoDB
const seedDB = async () => {
  try {
    const db = await connectDB();
    
    // Delete all existing properties
    await Property.deleteMany({});
    console.log('Deleted all existing properties');

    // Insert new properties
    await Property.insertMany(properties);
    console.log(`Successfully added ${properties.length} properties to the database`);

    // Close connection
    db.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDB(); 
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Property description is required'],
    },
    type: {
      type: String,
      required: [true, 'Property type is required'],
      enum: ['Apartment', 'House', 'Villa', 'Commercial'],
    },
    price: {
      type: Number,
      required: [true, 'Property price is required'],
    },
    location: {
      type: String,
      required: [true, 'Property location is required'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Number of bedrooms is required'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Number of bathrooms is required'],
    },
    area: {
      type: Number,
      required: [true, 'Property area is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model('Property', propertySchema);

export default Property; 
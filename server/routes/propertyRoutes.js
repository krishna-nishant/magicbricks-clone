import express from 'express';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} from '../controllers/propertyController.js';

const router = express.Router();

// GET all properties
router.get('/', getAllProperties);

// GET a single property
router.get('/:id', getPropertyById);

// POST a new property
router.post('/', createProperty);

// PUT update a property
router.put('/:id', updateProperty);

// DELETE a property
router.delete('/:id', deleteProperty);

export default router; 
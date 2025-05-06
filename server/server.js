import express from 'express';
import cors from 'cors';
import propertyRoutes from './routes/propertyRoutes.js';
import config, { connectDB } from './config/config.js';
import { startHealthCheckCron } from './utils/cronHealthCheck.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/properties', propertyRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MagicBricks API is running...');
});

// Connect to database
connectDB();

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  
  // startHealthCheckCron();
});

export default app;
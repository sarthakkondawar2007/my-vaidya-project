import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleTriage } from './src/controllers/triageController.js';
import { handleGetProviders } from './src/controllers/providerController.js';
import { handleCreateBooking } from './src/controllers/bookingController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Application Routes
app.post('/api/triage', handleTriage);
app.get('/api/providers', handleGetProviders);
app.post('/api/bookings', handleCreateBooking);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Vaidya Backend listening on http://localhost:${PORT}`);
});

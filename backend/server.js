import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './src/routes/productRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import vipRoutes from './src/routes/vipRoutes.js';
import inquiryRoutes from './src/routes/inquiryRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import { notFoundHandler, errorHandler } from './src/middlewares/errorHandler.js';
import { db } from './src/config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://localhost:3000').split(',');
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev mode for smooth pair programming
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Luvia Luxury REST API',
    version: '1.0.0',
    uptime: `${process.uptime().toFixed(1)}s`
  });
});

// API Root info
app.get('/', (req, res) => {
  res.json({
    name: 'Maison de Luvia - Backend API Engine',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      products: 'GET, POST /api/products',
      productById: 'GET, PUT, DELETE /api/products/:id',
      categories: 'GET /api/products/meta/categories',
      pricingTiers: 'GET /api/products/meta/pricing-tiers',
      testimonials: 'GET /api/products/meta/testimonials',
      orders: 'GET, POST /api/orders',
      orderById: 'GET, PATCH /api/orders/:id',
      vipClub: 'POST /api/vip/subscribe, GET /api/vip/subscribers',
      inquiries: 'GET, POST /api/inquiries',
      reviews: 'GET, POST /api/reviews',
      adminStats: 'GET /api/admin/stats'
    }
  });
});

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/vip', vipRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// Error Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`\n✦ Luvia Luxury REST API Engine is active on: http://localhost:${PORT}`);
  console.log(`✦ Health Check: http://localhost:${PORT}/api/health\n`);
});

export { app, server };

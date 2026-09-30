import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  seedProducts,
  seedTestimonials,
  seedPricingTiers,
  seedReviews,
  seedSubscribers,
  seedOrders
} from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

class Database {
  constructor() {
    this.data = {
      products: [],
      testimonials: [],
      pricingTiers: [],
      reviews: [],
      subscribers: [],
      orders: [],
      inquiries: [],
      settings: {
        storeName: "Maison de Luvia",
        currency: "INR",
        freeShippingThreshold: 0,
        conciergeEmail: "concierge@luvia.luxury"
      }
    };
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = {
          products: parsed.products || seedProducts,
          testimonials: parsed.testimonials || seedTestimonials,
          pricingTiers: parsed.pricingTiers || seedPricingTiers,
          reviews: parsed.reviews || seedReviews,
          subscribers: parsed.subscribers || seedSubscribers,
          orders: parsed.orders || seedOrders,
          inquiries: parsed.inquiries || [],
          settings: parsed.settings || this.data.settings
        };
      } else {
        // First run - populate seed data
        this.data.products = [...seedProducts];
        this.data.testimonials = [...seedTestimonials];
        this.data.pricingTiers = [...seedPricingTiers];
        this.data.reviews = [...seedReviews];
        this.data.subscribers = [...seedSubscribers];
        this.data.orders = [...seedOrders];
        this.data.inquiries = [];
        this.save();
      }
    } catch (err) {
      console.error('Database initialization error:', err);
    }
  }

  save() {
    try {
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (err) {
      console.error('Failed to persist database:', err);
    }
  }

  // Generic collection helpers
  getCollection(name) {
    return this.data[name] || [];
  }

  insert(collectionName, item) {
    if (!this.data[collectionName]) {
      this.data[collectionName] = [];
    }
    this.data[collectionName].push(item);
    this.save();
    return item;
  }

  findById(collectionName, id) {
    const list = this.data[collectionName] || [];
    return list.find((item) => String(item.id) === String(id));
  }

  updateById(collectionName, id, updates) {
    const list = this.data[collectionName] || [];
    const index = list.findIndex((item) => String(item.id) === String(id));
    if (index === -1) return null;

    this.data[collectionName][index] = {
      ...this.data[collectionName][index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data[collectionName][index];
  }

  deleteById(collectionName, id) {
    const list = this.data[collectionName] || [];
    const initialLen = list.length;
    this.data[collectionName] = list.filter((item) => String(item.id) !== String(id));
    const deleted = this.data[collectionName].length < initialLen;
    if (deleted) {
      this.save();
    }
    return deleted;
  }
}

export const db = new Database();

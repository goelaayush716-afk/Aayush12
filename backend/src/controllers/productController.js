import { db } from '../config/db.js';

// GET /api/products
export const getProducts = (req, res) => {
  try {
    let products = db.getCollection('products');
    const { category, tag, search, sort, minPrice, maxPrice } = req.query;

    if (category) {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag) {
      products = products.filter(
        (p) => p.tag && p.tag.toLowerCase() === tag.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (minPrice) {
      products = products.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      products = products.filter((p) => p.price <= Number(maxPrice));
    }

    if (sort) {
      if (sort === 'price_asc') {
        products.sort((a, b) => a.price - b.price);
      } else if (sort === 'price_desc') {
        products.sort((a, b) => b.price - a.price);
      } else if (sort === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/products/:id
export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = db.findById('products', id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product with id '${id}' not found`
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/products
export const createProduct = (req, res) => {
  try {
    const { name, category, price, description, image, colors, features, tag } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        error: 'Product name, category, and price are required.'
      });
    }

    const id = req.body.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = db.findById('products', id);
    if (existing) {
      return res.status(400).json({
        success: false,
        error: `Product with identifier '${id}' already exists.`
      });
    }

    const newProduct = {
      id,
      name,
      category,
      price: Number(price),
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
      rating: req.body.rating || 5,
      tag: tag || 'New',
      stock: req.body.stock !== undefined ? Number(req.body.stock) : 10,
      image: image || '/images/hero-bag.png',
      thumbnails: req.body.thumbnails || [image || '/images/hero-bag.png'],
      tagline: req.body.tagline || 'Exquisite handcrafted luxury.',
      description: description || 'Masterfully constructed luxury leather piece.',
      features: features || [],
      dimensions: req.body.dimensions || { height: "25 cm", width: "30 cm", depth: "10 cm", handleDrop: "15 cm" },
      colors: colors || [{ name: "Midnight Black", hex: "#111115" }],
      createdAt: new Date().toISOString()
    };

    const saved = db.insert('products', newProduct);

    res.status(201).json({
      success: true,
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /api/products/:id
export const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updateById('products', id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Product with id '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /api/products/:id
export const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteById('products', id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: `Product with id '${id}' not found.`
      });
    }

    res.json({
      success: true,
      message: `Product '${id}' deleted successfully.`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/products/meta/categories
export const getCategories = (req, res) => {
  try {
    const products = db.getCollection('products');
    const categoryMap = {};

    products.forEach((p) => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    });

    const categories = Object.entries(categoryMap).map(([name, count]) => ({
      name,
      count
    }));

    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/products/meta/pricing-tiers
export const getPricingTiers = (req, res) => {
  try {
    const tiers = db.getCollection('pricingTiers');
    res.json({
      success: true,
      data: tiers
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/products/meta/testimonials
export const getTestimonials = (req, res) => {
  try {
    const testimonials = db.getCollection('testimonials');
    res.json({
      success: true,
      data: testimonials
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

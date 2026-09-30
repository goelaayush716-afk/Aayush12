import { db } from '../config/db.js';

// GET /api/reviews or GET /api/reviews?productId=...
export const getReviews = (req, res) => {
  try {
    let reviews = db.getCollection('reviews');
    const { productId } = req.query;

    if (productId) {
      reviews = reviews.filter((r) => r.productId === productId);
    }

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/reviews
export const createReview = (req, res) => {
  try {
    const { productId, author, rating, title, comment } = req.body;

    if (!productId || !author || !rating) {
      return res.status(400).json({
        success: false,
        error: 'Product ID, author name, and rating (1-5) are required.'
      });
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      productId,
      author,
      rating: Math.min(5, Math.max(1, Number(rating))),
      title: title || 'Verified Purchase Review',
      comment: comment || 'Exceptional piece of luxury craft.',
      createdAt: new Date().toISOString()
    };

    const saved = db.insert('reviews', newReview);

    res.status(201).json({
      success: true,
      message: 'Review posted successfully.',
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

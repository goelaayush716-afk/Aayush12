import { db } from '../config/db.js';

// GET /api/admin/stats
export const getAdminStats = (req, res) => {
  try {
    const products = db.getCollection('products');
    const orders = db.getCollection('orders');
    const subscribers = db.getCollection('subscribers');
    const inquiries = db.getCollection('inquiries');
    const reviews = db.getCollection('reviews');

    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    // Recent orders (last 5)
    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // Product stock distribution
    const lowStockProducts = products.filter((p) => p.stock !== undefined && p.stock <= 5);

    // Status distribution of orders
    const orderStatusCounts = orders.reduce((acc, order) => {
      acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        summary: {
          totalRevenue,
          totalOrders: orders.length,
          totalProducts: products.length,
          totalSubscribers: subscribers.length,
          totalInquiries: inquiries.length,
          totalReviews: reviews.length
        },
        orderStatusCounts,
        lowStockProducts,
        recentOrders
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

import { db } from '../config/db.js';

// Helper to generate luxury tracking code
const generateOrderId = () => {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `LUV-${year}-${randomSuffix}`;
};

// POST /api/orders
export const createOrder = (req, res) => {
  try {
    const { customer, items, paymentMethod } = req.body;

    if (!customer || !customer.fullName || !customer.email || !customer.address) {
      return res.status(400).json({
        success: false,
        error: 'Customer details (fullName, email, address) are required for order fulfillment.'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Order must contain at least one item.'
      });
    }

    // Calculate totals & verify items
    let subtotal = 0;
    const validatedItems = items.map((item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      subtotal += price * qty;

      // Adjust product stock if product exists in DB
      if (item.id) {
        const product = db.findById('products', item.id);
        if (product && product.stock !== undefined) {
          const newStock = Math.max(0, product.stock - qty);
          db.updateById('products', item.id, { stock: newStock });
        }
      }

      return {
        id: item.id || 'custom-item',
        name: item.name || 'Luxury Selection',
        color: item.color || 'Standard',
        price,
        quantity: qty,
        image: item.image || '/images/hero-bag.png'
      };
    });

    const shippingFee = 0; // Complimentary White-Glove Shipping
    const total = subtotal + shippingFee;

    // Delivery estimate: 3 to 5 business days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);

    const orderId = generateOrderId();
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone || 'N/A',
        address: customer.address
      },
      items: validatedItems,
      subtotal,
      shippingFee,
      total,
      paymentMethod: paymentMethod || 'VIP Encrypted Card',
      paymentStatus: 'Paid',
      orderStatus: 'Processing',
      estimatedDelivery: deliveryDate.toISOString().split('T')[0]
    };

    const savedOrder = db.insert('orders', newOrder);

    res.status(201).json({
      success: true,
      message: 'Luxury acquisition confirmed.',
      data: savedOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/orders
export const getOrders = (req, res) => {
  try {
    let orders = db.getCollection('orders');
    const { email, status } = req.query;

    if (email) {
      orders = orders.filter(
        (o) => o.customer.email.toLowerCase() === email.toLowerCase()
      );
    }

    if (status) {
      orders = orders.filter(
        (o) => o.orderStatus.toLowerCase() === status.toLowerCase()
      );
    }

    // Sort newest first
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/orders/:id
export const getOrderById = (req, res) => {
  try {
    const { id } = req.params;
    const order = db.findById('orders', id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order with reference '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PATCH /api/orders/:id/status
export const updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const validStatuses = ['Pending', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'];
    if (!orderStatus || !validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = db.updateById('orders', id, { orderStatus });

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Order with reference '${id}' not found.`
      });
    }

    res.json({
      success: true,
      message: `Order status updated to ${orderStatus}.`,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

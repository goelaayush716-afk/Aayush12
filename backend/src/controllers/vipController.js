import { db } from '../config/db.js';

// POST /api/vip/subscribe
export const subscribeVip = (req, res) => {
  try {
    const { email, tier = 'Inner Circle' } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.'
      });
    }

    const subscribers = db.getCollection('subscribers');
    const existing = subscribers.find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'You are already an esteemed member of the Luvia Inner Circle.',
        data: existing
      });
    }

    const newSub = {
      id: `sub-${Date.now()}`,
      email: email.trim().toLowerCase(),
      joinedAt: new Date().toISOString(),
      status: 'Active',
      tier
    };

    const saved = db.insert('subscribers', newSub);

    res.status(201).json({
      success: true,
      message: 'Welcome to the Luvia Inner Circle. Your privileges are now active.',
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/vip/subscribers
export const getSubscribers = (req, res) => {
  try {
    const subscribers = db.getCollection('subscribers');
    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

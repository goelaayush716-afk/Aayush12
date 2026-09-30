import { db } from '../config/db.js';

// POST /api/inquiries
export const createInquiry = (req, res) => {
  try {
    const { name, email, phone, preferredSilhouette, customRequest, consultationDate } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required for concierge booking.'
      });
    }

    const newInquiry = {
      id: `INQ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name,
      email: email.trim().toLowerCase(),
      phone: phone || '',
      preferredSilhouette: preferredSilhouette || 'Bespoke Commission',
      customRequest: customRequest || '',
      consultationDate: consultationDate || '',
      status: 'Received'
    };

    const saved = db.insert('inquiries', newInquiry);

    res.status(201).json({
      success: true,
      message: 'Your concierge request has been received. An atelier specialist will contact you within 24 hours.',
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/inquiries
export const getInquiries = (req, res) => {
  try {
    const inquiries = db.getCollection('inquiries');
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

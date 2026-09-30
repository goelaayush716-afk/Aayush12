const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

async function fetchJson(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP error ${response.status}`);
  }
  return data;
}

export const api = {
  // Products & Catalog
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== '') {
        query.append(key, val);
      }
    });
    const qs = query.toString() ? `?${query.toString()}` : '';
    return fetchJson(`/products${qs}`);
  },

  async getProductById(id) {
    return fetchJson(`/products/${id}`);
  },

  async getCategories() {
    return fetchJson('/products/meta/categories');
  },

  async getPricingTiers() {
    return fetchJson('/products/meta/pricing-tiers');
  },

  async getTestimonials() {
    return fetchJson('/products/meta/testimonials');
  },

  // Orders & Checkout
  async createOrder(orderPayload) {
    return fetchJson('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload)
    });
  },

  async getOrderById(orderId) {
    return fetchJson(`/orders/${orderId}`);
  },

  async getOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    const qs = query ? `?${query}` : '';
    return fetchJson(`/orders${qs}`);
  },

  // VIP Club Newsletter
  async subscribeVip(email, tier = 'Inner Circle') {
    return fetchJson('/vip/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, tier })
    });
  },

  async getSubscribers() {
    return fetchJson('/vip/subscribers');
  },

  // Atelier Concierge Inquiries
  async submitInquiry(inquiryData) {
    return fetchJson('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    });
  },

  // Reviews
  async getReviews(productId) {
    const qs = productId ? `?productId=${encodeURIComponent(productId)}` : '';
    return fetchJson(`/reviews${qs}`);
  },

  async submitReview(reviewData) {
    return fetchJson('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  // Admin & Analytics
  async getAdminStats() {
    return fetchJson('/admin/stats');
  },

  // Health check
  async checkHealth() {
    return fetchJson('/health');
  }
};

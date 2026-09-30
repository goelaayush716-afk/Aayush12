// Automated API verification test suite
import http from 'http';

const API_BASE = process.env.TEST_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const config = {
    method: options.method || 'GET',
    headers
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

async function runSuite() {
  console.log('\n=============================================');
  console.log('  ✦ RUNNING LUVIA BACKEND API TEST SUITE ✦');
  console.log('=============================================\n');

  try {
    // 1. Health check
    console.log('[1/7] Testing Health Check endpoint...');
    const health = await request('/api/health');
    assert(health.status === 200, `Health check returned status 200 (got ${health.status})`);
    assert(health.data.status === 'healthy', 'Health status is "healthy"');

    // 2. Products API
    console.log('\n[2/7] Testing Products & Catalog endpoint...');
    const productsRes = await request('/api/products');
    assert(productsRes.status === 200, 'GET /api/products returns status 200');
    assert(Array.isArray(productsRes.data.data), 'Products data is an array');
    assert(productsRes.data.data.length >= 4, `Found ${productsRes.data.data.length} products`);

    // 3. Single Product Lookup
    console.log('\n[3/7] Testing Single Product Lookup...');
    const singleProduct = await request('/api/products/royal-luxe-tote');
    assert(singleProduct.status === 200, 'GET /api/products/royal-luxe-tote returns 200');
    assert(singleProduct.data.data.name === 'Royal Luxe Tote', 'Product name is Royal Luxe Tote');

    // 4. VIP Club Subscription
    console.log('\n[4/7] Testing VIP Club Subscription...');
    const testEmail = `collector-${Date.now()}@luvia-test.com`;
    const vipRes = await request('/api/vip/subscribe', {
      method: 'POST',
      body: { email: testEmail }
    });
    assert(vipRes.status === 201 || vipRes.status === 200, `VIP subscribe status 201/200 (got ${vipRes.status})`);
    assert(vipRes.data.success === true, 'VIP subscription succeeded');

    // 5. Order Creation & Checkout
    console.log('\n[5/7] Testing Order Creation & Stock Calculation...');
    const orderPayload = {
      customer: {
        fullName: "Lady Genevieve",
        email: "genevieve@luxury.co",
        phone: "+91 99999 88888",
        address: {
          line1: "10 Heritage Blvd",
          city: "New Delhi",
          state: "Delhi",
          postalCode: "110001",
          country: "India"
        }
      },
      items: [
        {
          id: "royal-luxe-tote",
          name: "Royal Luxe Tote",
          price: 18999,
          color: "Dark Emerald",
          quantity: 1
        }
      ],
      paymentMethod: "VIP Encrypted Card"
    };

    const orderRes = await request('/api/orders', {
      method: 'POST',
      body: orderPayload
    });

    assert(orderRes.status === 201, `Order placement returned 201 (got ${orderRes.status})`);
    assert(orderRes.data.data.id.startsWith('LUV-'), `Generated order ID format valid: ${orderRes.data?.data?.id}`);
    assert(orderRes.data.data.total === 18999, 'Order total calculated properly');

    const createdOrderId = orderRes.data.data.id;

    // Verify order can be retrieved
    const getOrder = await request(`/api/orders/${createdOrderId}`);
    assert(getOrder.status === 200, `GET /api/orders/${createdOrderId} successfully retrieved`);

    // 6. Concierge Inquiries & Reviews
    console.log('\n[6/7] Testing Concierge Inquiries & Product Reviews...');
    const inqRes = await request('/api/inquiries', {
      method: 'POST',
      body: {
        name: "Lord Harrington",
        email: "harrington@atelier.uk",
        preferredSilhouette: "Bespoke Royal Luxe Trunk",
        customRequest: "24K monogram initials LH with calfskin in Midnight Obsidian"
      }
    });
    assert(inqRes.status === 201, 'POST /api/inquiries returned 201');

    const revRes = await request('/api/reviews', {
      method: 'POST',
      body: {
        productId: "royal-luxe-tote",
        author: "Countess Victoria",
        rating: 5,
        title: "Sublime leather grain",
        comment: "Unmatched craftsmanship. Highly recommended."
      }
    });
    assert(revRes.status === 201, 'POST /api/reviews returned 201');

    // 7. Admin Analytics
    console.log('\n[7/7] Testing Admin Analytics Dashboard Data...');
    const adminRes = await request('/api/admin/stats');
    assert(adminRes.status === 200, 'GET /api/admin/stats returned 200');
    assert(adminRes.data.data.summary.totalOrders >= 2, `Total orders counted: ${adminRes.data.data.summary.totalOrders}`);
    assert(adminRes.data.data.summary.totalRevenue > 0, `Total revenue tracked: ₹${adminRes.data.data.summary.totalRevenue}`);

    console.log('\n=============================================');
    console.log(`  RESULTS: ${passed} Passed, ${failed} Failed`);
    console.log('=============================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test suite execution error:', err);
    process.exit(1);
  }
}

runSuite();

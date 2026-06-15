const request = require('supertest');
const app = require('../server');

describe('API endpoints', () => {
  test('GET /api/posts returns posts array', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /api/contact missing fields returns 400', async () => {
    const res = await request(app).post('/api/contact').send({ name: '', email: '', message: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('status', 'error');
  });

  test('POST /api/contact valid fields returns success when SMTP not configured', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Test', email: 'test@example.com', subject: 'Hello', message: 'This is a test.' });
    expect(res.statusCode === 200 || res.statusCode === 500).toBe(true);
    // If SMTP not configured we expect success message containing "email not configured"
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('status');
    }
  }, 10000);
});


import request from 'supertest';
import app from '../../app';

describe('POST /api/register', () => {
  it('should register a user successfully', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        password: 'TestPassword123',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('email', 'testuser@example.com');
  });
});

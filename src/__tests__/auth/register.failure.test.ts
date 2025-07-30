import request from 'supertest';
import app from '../../app';

describe('POST /api/register failures', () => {
  it('should fail to register with missing fields', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        email: 'fail@example.com',
        password: 'TestPassword123',
        // missing firstName and lastName
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail to register with invalid email', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'not-an-email',
        password: 'TestPassword123',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail to register with short password', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'shortpass@example.com',
        password: 'short',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail to register with existing email', async () => {
    // First registration
    await request(app)
      .post('/api/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'duplicate@example.com',
        password: 'TestPassword123',
      });
    // Second registration with same email
    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'duplicate@example.com',
        password: 'TestPassword123',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });
});

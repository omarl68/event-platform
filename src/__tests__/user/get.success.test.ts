import request from 'supertest';
import app from '../../app';

describe('USER GET - SUCCESS', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123',
      });
    token = loginRes.body.data.token;

    // Create a user to get
    const createRes = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Get',
        lastName: 'Me',
        email: 'get.me@example.com',
        password: 'Password123',
      });
    userId = createRes.body.data.id || createRes.body.data._id;
  });

  it('should get user by id', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('email', 'get.me@example.com');
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .query({ perPage: 1, page: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('docs');
    expect(Array.isArray(res.body.data.docs)).toBe(true);
  });
});

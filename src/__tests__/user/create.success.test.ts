import request from 'supertest';
import app from '../../app';

describe('USER CREATE - SUCCESS', () => {
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
  });

  it('should create a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe+create@example.com',
        password: 'Password123',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'User created successfully');
    expect(res.body.data).toHaveProperty('email', 'jane.doe+create@example.com');
    userId = res.body.data.id || res.body.data._id;
  });
});

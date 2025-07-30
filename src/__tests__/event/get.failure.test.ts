import request from 'supertest';
import app from '../../app';

describe('EVENT GET - FAILURE', () => {
  let token: string;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123',
      });
    token = loginRes.body.data.token;
  });

  it('should fail to get event with invalid id', async () => {
    const res = await request(app)
      .get('/api/events/invalid-id')
      .set('Authorization', `Bearer ${token}`);
    expect([400, 401, 404]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });
});

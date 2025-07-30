import request from 'supertest';
import app from '../../app';

describe('USER CREATE - FAILURE', () => {
  it('should fail to create user with missing fields', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'fail@example.com' });
    expect([400, 401]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });
});

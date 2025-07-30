import request from 'supertest';
import app from '../../app';

describe('USER UPDATE - FAILURE', () => {
  it('should fail to update user with invalid id', async () => {
    const res = await request(app)
      .put('/api/users/invalid-id')
      .send({ firstName: 'Fail' });
    expect([400, 401, 404]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });
});

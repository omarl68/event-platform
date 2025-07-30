import request from 'supertest';
import app from '../../app';

describe('USER DELETE - FAILURE', () => {
  it('should fail to delete user with invalid id', async () => {
    const res = await request(app)
      .delete('/api/users/invalid-id');
    expect([400, 401, 404]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });
});

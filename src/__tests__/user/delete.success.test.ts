import request from 'supertest';
import app from '../../app';

describe('USER DELETE - SUCCESS', () => {
  let userId: string;
  let token: string;

  beforeAll(async () => {
    // Login to get a valid token
    const loginRes = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123',
      });
    token = loginRes.body.data.token;

    // Create a user to delete
    const createRes = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Delete',
        lastName: 'Me',
        email: 'delete.me@example.com',
        password: 'Password123',
      });
    userId = createRes.body.data.id || createRes.body.data._id;
  });

  it('should delete user', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });
});

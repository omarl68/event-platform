import request from 'supertest';
import app from '../../app';

describe('USER UPDATE - SUCCESS', () => {
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

    // Create a user to update
    const createRes = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Update',
        lastName: 'Me',
        email: 'update.me@example.com',
        password: 'Password123',
      });
    userId = createRes.body.data.id || createRes.body.data._id;
  });

  it('should update user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'Updated' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('firstName', 'Updated');
  });
});

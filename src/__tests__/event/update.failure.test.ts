import request from 'supertest';
import app from '../../app';

describe('EVENT UPDATE - FAILURE', () => {
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

  it('should fail to update event with invalid id', async () => {
    const res = await request(app)
      .put('/api/events/invalid-id')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Fail Update',
        date: new Date().toISOString(),
        location: 'Test Location',
        numberOfParticipants: 0
      });
    expect([400, 401, 404]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });
});

import request from 'supertest';
import app from '../../app';

describe('EVENT - FAILURE', () => {
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

  it('should fail to create event with missing fields', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect([400, 401]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail to get event with invalid id', async () => {
    const res = await request(app)
      .get('/api/events/invalid-id')
      .set('Authorization', `Bearer ${token}`);
    expect([400, 401, 404]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail to update event with invalid id', async () => {
    const res = await request(app)
      .put('/api/events/invalid-id')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Fail Update' });
    expect([400, 401, 404]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail to delete event with invalid id', async () => {
    const res = await request(app)
      .delete('/api/events/invalid-id')
      .set('Authorization', `Bearer ${token}`);
    expect([400, 401, 404]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });
});

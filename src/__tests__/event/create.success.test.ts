import request from 'supertest';
import app from '../../app';

describe('EVENT CREATE - SUCCESS', () => {
  let token: string;
  let eventId: string;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123',
      });
    token = loginRes.body.data.token;
  });

  it('should create an event', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Event',
        date: new Date().toISOString(),
        location: 'Test Location',
        numberOfParticipants: 0
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('title', 'Test Event');
    eventId = res.body.data.id || res.body.data._id;
  });
});

import request from 'supertest';
import app from '../../app';

describe('EVENT GET - SUCCESS', () => {
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

    // Create an event to get
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Get Event',
        date: new Date().toISOString(),
        location: 'Test Location',
        numberOfParticipants: 0
      });
    eventId = createRes.body.data.id || createRes.body.data._id;
  });

  it('should get all events', async () => {
    const res = await request(app)
      .get('/api/events')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('docs');
    expect(Array.isArray(res.body.data.docs)).toBe(true);
  });

  it('should get event by id', async () => {
    const res = await request(app)
      .get(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('title', 'Get Event');
  });

    it('should get event statistics', async () => {
        const res = await request(app)
        .get('/api/events/stats')
        .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data).toHaveProperty('totalEvents');
        expect(res.body.data).toHaveProperty('totalParticipants');
    });
});

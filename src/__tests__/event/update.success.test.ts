import request from 'supertest';
import app from '../../app';

describe('EVENT UPDATE - SUCCESS', () => {
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

    // Create an event to update
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Update Event',
        date: new Date().toISOString(),
        location: 'Test Location',
        numberOfParticipants: 0
      });
    eventId = createRes.body.data.id || createRes.body.data._id;
  });

  it('should update event', async () => {
    const res = await request(app)
      .put(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Event',
        date: new Date().toISOString(),
        location: 'Test Location',
        numberOfParticipants: 0
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('title', 'Updated Event');
  });
});

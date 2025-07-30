import request from 'supertest';
import app from '../../app';

describe('EVENT DELETE - SUCCESS', () => {
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

    // Create an event to delete
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Delete Event',
        date: new Date().toISOString(),
        location: 'Test Location',
        numberOfParticipants: 0
      });
    eventId = createRes.body.data.id || createRes.body.data._id;
  });

  it('should delete event', async () => {
    const res = await request(app)
      .delete(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message');
  });
});

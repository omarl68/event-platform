import request from 'supertest';
import app from '../../app';

describe('EVENT - SUCCESS', () => {
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
        expect(res.body.data).toHaveProperty('title');
        expect(['Test Event', 'Updated Event']).toContain(res.body.data.title);
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
        eventId = res.body.data.id || res.body.data._id || eventId;
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

import request from 'supertest';
import app from '../../app';

// Success tests

describe('USER - SUCCESS', () => {
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
  });

  it('should create a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'Password123',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'User created successfully');
    expect(res.body.data).toHaveProperty('email', 'jane.doe@example.com');
    userId = res.body.data.id || res.body.data._id;
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .query({ perPage: 1, page: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('docs');
    expect(Array.isArray(res.body.data.docs)).toBe(true);
  });

  it('should get user by id', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('email', 'jane.doe@example.com');
  });

  it('should update user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'Janet' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('firstName', 'Janet');
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

// Failure tests

describe('USER - FAILURE', () => {
  it('should fail to create user with missing fields', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'fail@example.com' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail to get user with invalid id', async () => {
    const res = await request(app)
      .get('/api/users/invalid-id');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail to update user with invalid id', async () => {
    const res = await request(app)
      .put('/api/users/invalid-id')
      .send({ firstName: 'Fail' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail to delete user with invalid id', async () => {
    const res = await request(app)
      .delete('/api/users/invalid-id');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
  });
});

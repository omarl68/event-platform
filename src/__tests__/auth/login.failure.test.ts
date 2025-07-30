import request from 'supertest';
import app from '../../app';

describe('LOGIN - FAILURE', () => {
  it('Should not login with wrong password!', async () => {
    const { status, body } = await request(app)
      .post(`/api/login`)
      .send({ email:"testuser@example.com", password: 'wrong-password' });
    expect(status).toBe(401);
    expect(body.message).toEqual('Invalid credentials');
  });

  it('Should not login with wrong email!', async () => {
    const { status, body } = await request(app)
      .post(`/api/login`)
      .send({ email: 'wrong-email@gmail.com', password: 'wrong-password' });
    expect(status).toBe(404);
    expect(body.message).toEqual('User not registered');
  });

  it('Should not login with unvalid email format!', async () => {
    const { status } = await request(app)
      .post(`/api/login`)
      .send({ email: 'unvalid-email', password: 'wrong-password' });
    expect(status).toBe(400);
  });
});

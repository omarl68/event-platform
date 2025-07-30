import request from 'supertest';
import app from '../../app';


export let adminToken: string;
export let internToken: string;
export let validatorToken: string;
export let companyToken: string;
export let refreshToken: string;


describe('LOGIN - SUCCESS', () => {

  it('Should login the admin!', async () => {
    const { status, body, headers } = await request(app)
      .post(`/api/login`)
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123',
      });

    expect(status).toBe(200);
    expect(body).toHaveProperty('success', true);
    expect(body).toHaveProperty('message', 'Login Success');
    expect(body.data).toHaveProperty('token');
    expect(body.data).toHaveProperty('user');
    expect(body.data.user).toMatchObject({
      id: expect.any(String),
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

});
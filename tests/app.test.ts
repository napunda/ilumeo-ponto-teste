import { app } from '../src/http/app';

const server = app.server;

describe('GET /', () => {
	it('should return status code 200 and a greeting message', async () => {
		const response = await request(server).get('/');
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Welcome to the home page');
	});
});

import request from 'supertest';

export default function () {
	return request(app.server);
}

import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { AuthService } from '../services/auth-service'; // Supondo que você tenha um AuthService para lidar com a lógica de autenticação

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	async login(request: FastifyRequest, reply: FastifyReply) {
		const schema = z.object({
			username: z.string().trim().min(3).max(255),
			password: z.string().min(6).max(255),
		});

		const { username, password } = schema.parse(request.body);
		const response = await this.authService.login({ username, password });

		return reply.send(response);
	}

	async register(request: FastifyRequest, reply: FastifyReply) {
		const schema = z.object({
			username: z.string().trim().min(3).max(255),
			password: z.string().min(6).max(255),
		});

		const { username, password } = schema.parse(request.body);
		const response = await this.authService.register({
			username,
			password,
		});

		return reply.send(response);
	}

	async verifyToken(request: FastifyRequest, reply: FastifyReply) {
		const userId = (request.user as { userId: string }).userId;

		try {
			const response = await this.authService.verifyToken(userId);
			return reply.send(response);
		} catch (error) {
			console.error('Error verifying token:', error);
			return reply.status(500).send({ error: 'Failed to verify token' });
		}
	}
}

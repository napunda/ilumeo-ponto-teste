import type { FastifyRequest, FastifyReply } from 'fastify';
import { ShiftService } from '../services/shift-service';
import { z } from 'zod';

export class ShiftController {
	private shiftService: ShiftService;

	constructor() {
		this.shiftService = new ShiftService();
	}

	async createShift(request: FastifyRequest, reply: FastifyReply) {
		const userId = (request.user as { userId: string }).userId;

		try {
			const shift = await this.shiftService.createShift(userId);
			return reply.send({ shift });
		} catch (error) {
			console.error('Error creating shift:', error);
			return reply.status(500).send({ error: 'Failed to create shift' });
		}
	}

	async getShiftsForUser(request: FastifyRequest, reply: FastifyReply) {
		const userId = (request.user as { userId: string }).userId;

		const schemaRequest = z.object({
			limit: z.coerce.number().optional().default(16),
			direction: z.enum(['asc', 'desc']).default('desc'),
			page: z.coerce.number().optional().default(1),
			orderBy: z.string().optional().default('id'),
		});

		const { limit, direction, page, orderBy } = schemaRequest.parse(
			request.query,
		);

		try {
			const shifts = await this.shiftService.getShiftsForUser({
				where: { userId },
				orderBy,
				limit,
				direction,
				page,
			});

			return reply.send(shifts);
		} catch (error) {
			console.error('Error fetching shifts:', error);
			return reply.status(500).send({ error: 'Failed to fetch shifts' });
		}
	}

	async getLastShift(request: FastifyRequest, reply: FastifyReply) {
		const userId = (request.user as { userId: string }).userId;

		try {
			const shift = await this.shiftService.getLastShift(userId);
			return reply.send(shift);
		} catch (error) {
			console.error('Error fetching current shift:', error);
			return reply
				.status(500)
				.send({ error: 'Failed to fetch current shift' });
		}
	}
}

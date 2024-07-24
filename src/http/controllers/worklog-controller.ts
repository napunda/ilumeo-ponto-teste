import type { FastifyRequest, FastifyReply } from 'fastify';
import { WorkLogService } from '../services/work-log-service';
import { z } from 'zod';

export class WorkLogController {
	private workLogService: WorkLogService;

	constructor() {
		this.workLogService = new WorkLogService();
	}

	async index(request: FastifyRequest, reply: FastifyReply) {
		const schemaRequest = z.object({
			limit: z.coerce.number().optional().default(16),
			direction: z.enum(['asc', 'desc']).default('desc'),
			page: z.coerce.number().optional().default(1),
			orderBy: z.string().optional().default('startTime'),
		});

		const { limit, direction, page, orderBy } = schemaRequest.parse(
			request.query,
		);

		const userId = (request.user as { userId: string }).userId;

		const { id } = await this.workLogService.getLastShift(userId);

		try {
			const response = await this.workLogService.index({
				where: { shiftId: id },
				orderBy,
				limit,
				direction,
				page,
			});

			return reply.send(response);
		} catch (error) {
			console.error('Error fetching work-logs:', error);
			return reply
				.status(500)
				.send({ error: 'Failed to fetch work-logs' });
		}
	}
}

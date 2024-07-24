import { FastifyRequest, FastifyReply } from 'fastify';
import { ShiftService } from '../services/shift-service';
import { WorkLogService } from '../services/work-log-service';
import { z } from 'zod';

export class ClockInController {
	private shiftService: ShiftService;
	private workLogService: WorkLogService;

	constructor() {
		this.shiftService = new ShiftService();
		this.workLogService = new WorkLogService();
	}

	async clockIn(request: FastifyRequest, reply: FastifyReply) {
		const userId = (request.user as { userId: string }).userId;

		//verfy if user has a current shift
		const currentShift = await this.shiftService.getCurrentShift(userId);

		if (!currentShift || currentShift.duration) {
			try {
				const shift = await this.shiftService.createShift(userId);

				// create a worklog to current shift
				const worklog = await this.workLogService.createWorkLog(
					shift.id,
				);
				return reply.send({ worklog });
			} catch (error) {
				console.error('Error creating shift:', error);
				return reply
					.status(500)
					.send({ error: 'Failed to create shift' });
			}
		}

		// create a worklog to current shift

		// buscar por worklog com o mesmo shiftId e sem endTime

		const currentWorklog = await this.workLogService.getWorkLogByShift(
			currentShift.id,
		);

		if (currentWorklog) {
			// end worklog
			try {
				const worklog = await this.workLogService.endWorkLog(
					currentWorklog.id,
				);
				return reply.send({ worklog });
			} catch (error) {
				console.error('Error ending worklog:', error);
				return reply
					.status(500)
					.send({ error: 'Failed to end worklog' });
			}
		}

		// create new worklog

		try {
			const worklog = await this.workLogService.createWorkLog(
				currentShift.id,
			);
			return reply.send({ worklog });
		} catch (error) {
			console.error('Error creating worklog:', error);
			return reply
				.status(500)
				.send({ error: 'Failed to create worklog' });
		}
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
			limit:  z.coerce.number().optional().default(16),
			direction: z.enum(['asc', 'desc']).default('desc'),
			page: z.coerce.number().optional().default(1),
			orderBy: z.string().optional().default('startTime'),
		});

		const { limit, direction, page, orderBy } = schemaRequest.parse(
			request.body,
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
}

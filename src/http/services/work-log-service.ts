import { WorkLog } from '@prisma/client';
import prisma from '../../lib/prisma';
import {
	httpResponse,
	HttpResponseParams,
	IHttpResponse,
} from '../utils/http-response';

type GetWorLogsParams = Omit<HttpResponseParams, 'model'>;

export class WorkLogService {
	async createWorkLog(shiftId: number): Promise<WorkLog> {
		const startTime = new Date();

		const workLog = await prisma.workLog.create({
			data: {
				shiftId,
				startTime,
			},
		});

		return workLog;
	}

	async endWorkLog(workLogId: number): Promise<WorkLog> {
		const endTime = new Date();
		const workLog = await prisma.workLog.findUnique({
			where: { id: workLogId, endTime: null },
		});

		if (!workLog) {
			throw new Error(`WorkLog with ID ${workLogId} not found`);
		}

		const shiftId = workLog.shiftId;
		const totalWorklogs = await this.getTotalWorkLogsForShift(shiftId);

		// Calcular a duração em minutos
		const duration = Math.floor(
			(endTime.getTime() - workLog.startTime.getTime()) / 60000,
		);

		// Atualizar o workLog com o endTime e a duração
		const updatedWorkLog = await prisma.workLog.update({
			where: { id: workLogId },
			data: {
				endTime,
				duration,
			},
		});

		if (totalWorklogs == 4) {
			// Calcular a duration subtraindo a hora de início do primeiro worklog  do shift com a a hora de termino do último worklog do shift
			// Atualizar o shift com a duração total

			const firstWorkLog = await prisma.workLog.findFirst({
				where: { shiftId },
				orderBy: { startTime: 'asc' },
			});

			const lastWorkLog = await prisma.workLog.findFirst({
				where: { shiftId },
				orderBy: { startTime: 'desc' },
			});

			const duration = Math.floor(
				(lastWorkLog.endTime.getTime() -
					firstWorkLog.startTime.getTime()) /
					60000,
			);
			await prisma.shift.update({
				where: { id: shiftId },
				data: { duration },
			});
		}

		return updatedWorkLog;
	}

	async getWorkLogByShift(shiftId: number): Promise<WorkLog> {
		return await prisma.workLog.findFirst({
			where: { shiftId, endTime: null },
		});
	}
	async getTotalWorkLogsForShift(shiftId: number): Promise<number> {
		return await prisma.workLog.count({
			where: { shiftId },
		});
	}

	async index(params: GetWorLogsParams): Promise<IHttpResponse> {
		return await httpResponse({
			...params,
			model: 'workLog',
		});
	}
	async getLastShift(userId: string) {
		return await prisma.shift.findFirst({
			where: { userId },
			orderBy: { id: 'desc' },
		});
	}
}

import { Shift } from '@prisma/client';
import prisma from '../../lib/prisma';
import {
	IHttpResponse,
	HttpResponseParams,
	httpResponse,
} from '../utils/http-response';
type GetShiftsParams = Omit<HttpResponseParams, 'model'>;

export class ShiftService {
	async createShift(userId: string): Promise<Shift> {
		const shift = await prisma.shift.create({
			data: {
				date: new Date(),
				userId,
			},
		});
		return shift;
	}

	async getShiftsForUser(params: GetShiftsParams): Promise<IHttpResponse> {
		return await httpResponse({
			...params,
			model: 'shift',
		});
	}

	async getCurrentShift(userId: string): Promise<Shift | null> {
		const shift = await prisma.shift.findFirst({
			where: {
				userId,
				duration: null,
			},
		});
		return shift;
	}

	async getLastShift(userId: string): Promise<Shift | null> {
		const shift = await prisma.shift.findFirst({
			where: {
				userId,
			},
			orderBy: {
				date: 'desc',
			},
			include: {
				workLogs: true,
			},
		});
		return shift;
	}
}

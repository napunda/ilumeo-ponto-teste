import { Shift } from './shift';

export interface WorkLog {
	id: number;
	shiftId: number;
	date: Date;
	startTime: Date;
	endTime: Date | null;
	duration: number | null;
	shift: Shift;
	createdAt: Date;
	updatedAt: Date;
}

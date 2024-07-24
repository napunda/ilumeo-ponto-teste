import { User } from './user';
import { WorkLog } from './work-log';

export interface Shift {
	id: string;
	userId: string;
	startTime: Date;
	endTime: Date;
	duration: number;
	user: User;
	workLogs: WorkLog[];
}

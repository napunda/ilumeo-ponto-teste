import { Shift } from './shift';

export interface User {
	id: string;
	username: string;
	password: string;
	shifts: Shift[];
}

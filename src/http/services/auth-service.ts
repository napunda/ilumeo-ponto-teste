import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';
import { app } from '../app';

export class AuthService {
	async register({
		username,
		password,
	}: {
		username: string;
		password: string;
	}): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
			},
		});

		return user;
	}

	async login({
		username,
		password,
	}: {
		username: string;
		password: string;
	}) {
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (!user) {
			return null;
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return null;
		}

		const token = app.jwt.sign({
			userId: user.id,
		});

		return { user, token };
	}

	async verifyToken(userId: string) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}
}

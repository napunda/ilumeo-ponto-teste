import Fastify from 'fastify';
import { env } from '../env';

export const app = Fastify({
	ajv: {
		customOptions: {
			removeAdditional: 'all',
			coerceTypes: true,
			useDefaults: true,
		},
	},
	logger: {
		level: env.LOG_LEVEL ?? 'info',
	},
});

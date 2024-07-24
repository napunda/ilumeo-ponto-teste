import { z } from 'zod';

export const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	LOG_LEVEL: z.enum(['info', 'warn', 'error', 'debug']).default('debug'),
	HOST: z.string().default('http://localhost'),
	PORT: z.coerce.number().default(7777),
	JWT_SECRET: z.string(),

	/* POSTGRES CONFIG ENVIRONMENT */

	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_DATABASE: z.string(),
	DB_HOST: z.string().default('localhost'),
	DB_PORT: z.coerce.number().default(5432),
	DATABASE_URL: z.string().url(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error('Invalide enviroment variables', _env.error.format());

	throw new Error('Invalid environment variables');
}

export const env = _env.data;

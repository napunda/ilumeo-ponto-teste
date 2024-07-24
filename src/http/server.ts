import { env } from '../env';
import { app } from './app';
import cors from '@fastify/cors';
import routes from './routes';
import authPlugin from '../plugins/auth';

app.register(authPlugin);
app.register(cors, {
	origin: '*',
});
app.register(routes, { prefix: '/api' });

app.listen({
	port: env.PORT ?? 7777,
	host: env.HOST ?? '0.0.0.0',
})
	.then(async (address) => {
		console.log(`Server listening at ${address}`); //@TODO move this log to a logger
	})
	.catch((error) => {
		console.error(error);
		throw new Error('Server failed to start');
	});

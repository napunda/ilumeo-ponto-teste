import { FastifyPluginAsync } from 'fastify';
import authRoutes from './auth';
import shiftRoutes from './shifts';
import worklogRoutes from './worklogs';
import clockinRoutes from './clock-in';

const routes: FastifyPluginAsync = async (server) => {
	server.get('/', async (request, reply) => {
		reply.send({ message: 'Welcome to the home page' });
	});

	server.register(clockinRoutes, { prefix: '/clock-in' });
	server.register(authRoutes, { prefix: '/auth' });
	server.register(shiftRoutes, { prefix: '/shifts' });
	server.register(worklogRoutes, { prefix: '/worklogs' });
};

export default routes;

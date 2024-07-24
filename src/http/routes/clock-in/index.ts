import { FastifyPluginAsync } from 'fastify';
import { ClockInController } from '../../controllers/clock-in-controller';

const clockInController = new ClockInController();

const clockInRoutes: FastifyPluginAsync = async (server) => {
	server.addHook('onRequest', server.authenticate);

	server.get('/', clockInController.clockIn.bind(clockInController));
};

export default clockInRoutes;

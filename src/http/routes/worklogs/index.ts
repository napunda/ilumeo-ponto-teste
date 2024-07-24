import { FastifyPluginAsync } from 'fastify';
import { WorkLogController } from '../../controllers/worklog-controller';

const workLogController = new WorkLogController();
const worklogRoutes: FastifyPluginAsync = async (server) => {
	server.addHook('onRequest', server.authenticate);

	server.get('/', workLogController.index.bind(workLogController));
};

export default worklogRoutes;

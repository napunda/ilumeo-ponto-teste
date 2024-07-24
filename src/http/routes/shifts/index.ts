import { FastifyPluginAsync } from 'fastify';
import { ShiftController } from '../../controllers/shift-controller';

const shiftController = new ShiftController();

const shiftRoutes: FastifyPluginAsync = async (server) => {
	server.addHook('onRequest', server.authenticate);

	server.get('/', shiftController.getShiftsForUser.bind(shiftController));
	server.get(
		'/create-shift',
		shiftController.createShift.bind(shiftController),
	);

	server.get(
		'/last',
		shiftController.getLastShift.bind(shiftController),
	);
};

export default shiftRoutes;

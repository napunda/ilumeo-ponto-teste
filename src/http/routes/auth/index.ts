import { FastifyPluginAsync } from 'fastify';
import { AuthController } from '../../controllers/auth-controller';

const authController = new AuthController();

const authRoutes: FastifyPluginAsync = async (server) => {
	server.post('/register', authController.register.bind(authController));
	server.post('/login', authController.login.bind(authController));

	server.get(
		'/verify-token',
		{
			onRequest: server.authenticate,
		},
		authController.verifyToken.bind(authController),
	);
};

export default authRoutes;

import fp from 'fastify-plugin';
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { env } from '../env';
import { User } from '@prisma/client';

declare module 'fastify' {
	interface FastifyInstance {
		authenticate: (
			request: FastifyRequest,
			reply: FastifyReply,
		) => Promise<void>;
	}
}

declare module 'fastify' {
	interface FastifyRequest {
		user: string | object | Buffer;
	}
}

const authPlugin: FastifyPluginCallback = (server, options, done) => {
	server.register(fastifyJwt, { secret: env.JWT_SECRET });

	server.decorate(
		'authenticate',
		async (req: FastifyRequest, reply: FastifyReply) => {
			try {
				await req.jwtVerify();
				req.user = req.user as User;
			} catch (error) {
				reply.send(error);
			}
		},
	);

	done();
};

export default fp(authPlugin);

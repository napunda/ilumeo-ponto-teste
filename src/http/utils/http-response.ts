import prisma from '../../lib/prisma';

export interface IHttpResponse {
	limit: number;
	orderBy: 'asc' | 'desc';
	page: number;
	orderByField: string;
	data: object[];
}

export interface HttpResponseParams {
	model: string;
	where?: object;
	limit?: number;
	direction?: 'asc' | 'desc';
	page?: number;
	orderBy: string;
}

export const httpResponse = async ({
	model,
	where,
	limit = 16,
	direction = 'desc',
	page = 1,
	orderBy,
}: HttpResponseParams): Promise<IHttpResponse> => {
	const skip = (page - 1) * limit;

	const data = await prisma[model].findMany({
		where: where,
		orderBy: { [orderBy]: direction },
		take: limit,
		skip: skip,
	});

	return {
		limit,
		orderBy: direction,
		page,
		orderByField: orderBy,
		data,
	};
};

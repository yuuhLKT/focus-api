import { ReportFeedbackType } from '@prisma/client';
import 'dotenv/config';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ReportFeedbackCreate } from '../interfaces/report-feedback.interface';
import { ReportFeedbackUseCase } from '../use-cases/report-feedback.use-case';

export async function reportFeedbackRoutes(fastify: FastifyInstance) {
    const reportFeedbackUseCase = new ReportFeedbackUseCase();

    // POST ROUTE
    fastify.post<{ Body: ReportFeedbackCreate }>('/', {
        schema: {
            body: {
                type: 'object',
                required: ['title', 'content', 'authorName', 'type'],
                properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                    authorName: { type: 'string' },
                    type: { type: 'string', enum: Object.values(ReportFeedbackType).map(t => t.toLowerCase()) },
                },
            },
        },
        preHandler: async (req, reply) => {
            const isAuthorized = checkUserAuthorization(req);
            if (!isAuthorized) {
                reply.code(403).send({ message: 'Unauthorized' });
            }
        },
    }, async (req, reply) => {
        const { title, content, authorName, type } = req.body;
        const data = await reportFeedbackUseCase.create({ title, content, authorName, type });
        reply.code(201).send(data);
    });

    // GET ROUTE
    fastify.get('/', async (req, reply) => {
        const { type } = req.query as { type: ReportFeedbackType };
        let reports;

        if (type) {
            reports = await reportFeedbackUseCase.findAllByType(type);
        } else {
            return reply.code(400).send({ message: 'Type query parameter is required' });
        }

        reply.send(reports);
    });

    // GET by ID ROUTE
    fastify.get<{ Params: { id: string } }>('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const { id } = req.params;
        const report = await reportFeedbackUseCase.findById(id);

        if (!report) {
            reply.code(404).send({ message: `Report or feedback with id: ${id} not found` });
        } else {
            reply.send(report);
        }
    });

    // DELETE ROUTE
    fastify.delete<{ Params: { id: string } }>('/:id', {
        preHandler: async (req, reply) => {
            const isAuthorized = checkUserAuthorization(req);
            if (!isAuthorized) {
                reply.code(403).send({ message: 'Unauthorized' });
            }
        },
    }, async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const { id } = req.params;
        await reportFeedbackUseCase.deleteById(id);
        reply.code(200).send({ message: `Report or feedback with id: ${id} deleted successfully` });
    });
}

function checkUserAuthorization(req: FastifyRequest): boolean {
    const authToken = req.headers['authorization'];
    if (!authToken || authToken !== process.env.AUTH_TOKEN_HEADER) {
        return false;
    }
    return true;
}

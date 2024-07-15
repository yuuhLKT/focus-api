import { ReportFeedbackType } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { ReportFeedbackCreate } from '../interfaces/report-feedback.interface';
import { ReportFeedbackUseCase } from '../use-cases/report-feedback.use-case';

export async function reportFeedbackRoutes(fastify: FastifyInstance) {
    const reportFeedbackUseCase = new ReportFeedbackUseCase();

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
    }, async (req, reply) => {
        const { title, content, authorName, type } = req.body;
        const data = await reportFeedbackUseCase.create({ title, content, authorName, type });
        reply.code(201).send(data);
    });

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

    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        await reportFeedbackUseCase.deleteById(id);
        reply.code(200).send({ message: `Report or feedback with id: ${id} deleted successfully` });
    });
}

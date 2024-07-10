import { FastifyInstance } from "fastify";
import { ReportFeedbackCreate } from "../interfaces/report-feedback.interface";
import { ReportFeedbackUseCase } from "../use-cases/report-feedback.use-case";

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
                    type: { type: 'string' },
                },
            },
        },
    }, async (req, reply) => {
        const { title, content, authorName, type } = req.body;
        const data = await reportFeedbackUseCase.create({ title, content, authorName, type });
        reply.code(201).send(data);
    });

    fastify.get('/bugs', async (req, reply) => {
        const bugs = await reportFeedbackUseCase.findAllByType('BUG');
        if (bugs.length === 0) {
            return reply.code(404).send({ message: 'No bug reports found' });
        }
        reply.send(bugs);
    });

    fastify.get('/feedbacks', async (req, reply) => {
        const feedbacks = await reportFeedbackUseCase.findAllByType('FEEDBACK');
        if (feedbacks.length === 0) {
            return reply.code(404).send({ message: 'No feedbacks found' });
        }
        reply.send(feedbacks);

    });

    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        await reportFeedbackUseCase.deleteById(id);
        reply.code(200).send({ message: `Report or feedback with id: ${id} deleted successfully` });
    });
}
import 'dotenv/config';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { CommentCreate } from '../interfaces/comment.interface';
import { CommentUseCase } from '../use-cases/comment.use-case';

export async function commentReportFeedbackRoutes(fastify: FastifyInstance) {
    const commentUseCase = new CommentUseCase();

    // POST ROUTE for CREATE COMMENT and OPTIONAL FEEDBACK/REPORT STATUS UPDATE
    fastify.post<{ Body: { comment: CommentCreate, status?: string } }>('/comments', {
        schema: {
            body: {
                type: 'object',
                required: ['comment'],
                properties: {
                    comment: {
                        type: 'object',
                        required: ['commentTitle', 'content', 'authorName', 'reportFeedbackId'],
                        properties: {
                            commentTitle: { type: 'string' },
                            content: { type: 'string' },
                            authorName: { type: 'string' },
                            reportFeedbackId: { type: 'string' },
                        },
                    },
                    status: { type: 'string', enum: ['OPEN', 'WORKING', 'SOLVED', 'FEEDBACK'], nullable: true },
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
        const { comment, status } = req.body;
        const createdComment = await commentUseCase.createCommentWithOptionalStatusUpdate(comment, status);
        reply.code(201).send(createdComment);
    });

    // GET ROUTE for FINDING COMMENT by ID
    fastify.get<{ Params: { id: string } }>('/comments/:id', {
        schema: {
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string' },
                },
            },
        },
    }, async (req, reply) => {
        const { id } = req.params;
        const comment = await commentUseCase.getCommentById(id);
        if (!comment) {
            reply.code(404).send({ message: 'Comment not found' });
        }
        reply.send(comment);
    });

    // GET ROUTE for FINDING COMMENT by FEEDBACK OR REPORT ID
    fastify.get<{ Params: { id: string } }>('/post/comments/:id', {
        schema: {
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string' },
                },
            },
        },

    }, async (req, reply) => {
        const { id } = req.params;
        const comment = await commentUseCase.getCommentsByReportFeedbackId(id);
        if (!comment) {
            reply.code(404).send({ message: 'Comment not found' });
        }
        reply.send(comment);
    });


    // DELETE ROUTE COMMENT by ID 
    fastify.delete<{ Params: { id: string } }>('/comments/:id', {
        schema: {
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string' },
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
        const { id } = req.params;
        await commentUseCase.deleteCommentById(id);
        reply.code(204).send();
    });
}

function checkUserAuthorization(req: FastifyRequest): boolean {
    const authToken = req.headers['authorization'];
    if (!authToken || authToken !== process.env.AUTH_TOKEN_HEADER) {
        return false;
    }
    return true;
}


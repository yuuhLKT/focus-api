import { Comment as PrismaComment } from '@prisma/client';
import { CommentCreate, CommentRepository } from '../interfaces/comment.interface';
import { prisma } from '../utils/prisma';
import { getRealId } from '../utils/tempIdManager';

class CommentRepositoryPrisma implements CommentRepository {
    async create(data: CommentCreate): Promise<PrismaComment> {
        const realId = getRealId(data.reportFeedbackId);
        return await prisma.comment.create({
            data: {
                commentTitle: data.commentTitle,
                content: data.content,
                authorName: data.authorName,
                reportFeedbackId: realId,
            },
        });
    }

    async findCommentById(id: string): Promise<PrismaComment | null> {
        const realId = getRealId(id);
        return await prisma.comment.findFirst({
            where: { id: realId },
        });
    }

    async findByFeedbackReportId(id: string): Promise<PrismaComment | null> {
        const realId = getRealId(id);
        return await prisma.comment.findFirst({
            where: { reportFeedbackId: realId },
        });
    }

    async deleteById(id: string): Promise<void> {
        const realId = getRealId(id);
        await prisma.comment.delete({
            where: { id: realId },
        });
    }
}

export { CommentRepositoryPrisma };


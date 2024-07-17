import { ReportFeedbackStatus } from "@prisma/client";
import { CommentCreate, CommentRepository } from "../interfaces/comment.interface";
import { CommentRepositoryPrisma } from "../repositories/comment.repository";
import { prisma } from '../utils/prisma';
import { getRealId } from "../utils/tempIdManager";

class CommentUseCase {
    private commentRepository: CommentRepository;

    constructor() {
        this.commentRepository = new CommentRepositoryPrisma();
    }

    async createCommentWithOptionalStatusUpdate(data: CommentCreate, status?: string) {
        const comment = await this.commentRepository.create(data);

        if (status) {
            const realId = getRealId(data.reportFeedbackId);
            await prisma.reportFeedback.update({
                where: { id: realId },
                data: { status: status as ReportFeedbackStatus },
            });
        }

        return comment;
    }

    async getCommentById(id: string) {
        try {
            return this.commentRepository.findCommentById(id);
        } catch (error) {
            throw new Error('Error finding by id: ' + error.message);
        }
    }

    async getCommentsByReportFeedbackId(id: string) {
        try {
            return this.commentRepository.findByFeedbackReportId(id);
        } catch (error) {
            throw new Error('Error finding by id: ' + error.message);
        }
    }

    async deleteCommentById(id: string) {
        try {
            return this.commentRepository.deleteById(id);
        } catch (error) {
            throw new Error('Error deleting by id: ' + error.message);
        }
    }

}

export { CommentUseCase };


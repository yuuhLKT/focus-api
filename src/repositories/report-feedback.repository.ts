import { ReportFeedback, ReportFeedbackRepository, ReportFeedbackType } from "../interfaces/report-feedback.interface";
import { prisma } from '../utils/prisma';
import { deleteTempId, generateTempId, getRealId } from '../utils/tempIdManager';

class ReportFeedbackRepositoryPrisma implements ReportFeedbackRepository {
    async create(data: ReportFeedback): Promise<ReportFeedback> {
        const result = await prisma.reportFeedback.create({
            data: {
                title: data.title,
                content: data.content,
                authorName: data.authorName,
                type: data.type,
                status: data.status,
                createdAt: data.createdAt,
            },
        });
        return {
            ...result,
            id: generateTempId(result.id),
        };
    }

    async findAllByType(type: ReportFeedbackType): Promise<ReportFeedback[]> {
        const results = await prisma.reportFeedback.findMany({
            where: { type },
        });
        return results.map((result) => ({
            ...result,
            id: generateTempId(result.id),
        }));
    }


    async findById(tempId: string): Promise<ReportFeedback | null> {
        const realId = getRealId(tempId);
        const result = await prisma.reportFeedback.findUnique({
            where: { id: realId },
        });
        return result ? {
            ...result,
            id: tempId,
        } : null;
    }

    async deleteById(tempId: string): Promise<void> {
        const realId = getRealId(tempId);
        await prisma.reportFeedback.delete({
            where: { id: realId },
        });
        deleteTempId(tempId);
    }

    async updateStatusById(tempId: string, data: Partial<ReportFeedback>): Promise<ReportFeedback> {
        const realId = getRealId(tempId);
        const result = await prisma.reportFeedback.update({
            where: { id: realId },
            data: {
                status: data.status,
            },
        });
        return {
            ...result,
            id: tempId,
        };
    }
}

export { ReportFeedbackRepositoryPrisma };


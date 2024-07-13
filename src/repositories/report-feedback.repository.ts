import { PrismaClient } from "@prisma/client";
import { ReportFeedback, ReportFeedbackRepository, ReportFeedbackType } from "../interfaces/report-feedback.interface";

const prisma = new PrismaClient();

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
        return result;
    }

    async findAllByType(type: ReportFeedbackType): Promise<ReportFeedback[]> {
        return prisma.reportFeedback.findMany({
            where: { type },
        });
    }

    async deleteById(id: string): Promise<void> {
        await prisma.reportFeedback.delete({
            where: { id },
        });
    }
}

export { ReportFeedbackRepositoryPrisma };


import { ReportFeedback, ReportFeedbackCreate, ReportFeedbackRepository, ReportFeedbackType } from "../interfaces/report-feedback.interface";
import { Prisma } from "../utils/prisma";

class ReportFeedbackRepositoryPrisma implements ReportFeedbackRepository {
    async create(data: ReportFeedbackCreate): Promise<ReportFeedback> {
        const result = await Prisma.reportFeedback.create({
            data: {
                title: data.title,
                content: data.content,
                authorName: data.authorName,
                type: data.type,
            },
        });
        return result;
    }

    async findAllByType(type: ReportFeedbackType): Promise<ReportFeedback[]> {
        return Prisma.reportFeedback.findMany({
            where: { type },
        });
    }

    async deleteById(id: string): Promise<void> {
        await Prisma.reportFeedback.delete({
            where: { id },
        })
    }
}

export { ReportFeedbackRepositoryPrisma };


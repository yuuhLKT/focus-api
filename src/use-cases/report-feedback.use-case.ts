import { ReportFeedback, ReportFeedbackCreate, ReportFeedbackRepository, ReportFeedbackType } from "../interfaces/report-feedback.interface";
import { ReportFeedbackRepositoryPrisma } from "../repositories/report-feedback.repository";
import { Prisma } from "../utils/prisma";

class ReportFeedbackUseCase {
    private reportFeedbackRepository: ReportFeedbackRepository;

    constructor() {
        this.reportFeedbackRepository = new ReportFeedbackRepositoryPrisma();
    }

    async create({ title, content, authorName, type }: ReportFeedbackCreate) {
        try {
            const result = await Prisma.reportFeedback.create({
                data: {
                    title,
                    content,
                    authorName,
                    type: type.toUpperCase() as ReportFeedbackType,
                },
            });
            return result;
        } catch (error) {
            throw new Error('Error creating report or feedback: ' + error);
        }
    }

    async findAllByType(type: ReportFeedbackType): Promise<ReportFeedback[]> {
        try {
            return this.reportFeedbackRepository.findAllByType(type.toUpperCase() as ReportFeedbackType);
        } catch (error) {
            throw new Error('Error finding all by type: ' + error);
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            return this.reportFeedbackRepository.deleteById(id);
        } catch (error) {
            throw new Error('Error for delete by id: ' + error);
        }
    }
}

export { ReportFeedbackUseCase };


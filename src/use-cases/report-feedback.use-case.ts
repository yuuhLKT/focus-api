import { ReportFeedback, ReportFeedbackCreate, ReportFeedbackRepository, ReportFeedbackStatus, ReportFeedbackType } from "../interfaces/report-feedback.interface";
import { ReportFeedbackRepositoryPrisma } from "../repositories/report-feedback.repository";

class ReportFeedbackUseCase {
    private reportFeedbackRepository: ReportFeedbackRepository;

    constructor() {
        this.reportFeedbackRepository = new ReportFeedbackRepositoryPrisma();
    }

    async create(data: ReportFeedbackCreate): Promise<ReportFeedback> {
        const { title, content, authorName, type } = data;
        const normalizedType = type.toUpperCase() as ReportFeedbackType;
        let status: ReportFeedbackStatus;

        if (normalizedType === 'FEEDBACK') {
            status = 'FEEDBACK';
        } else {
            status = 'OPEN';
        }

        try {
            const result = await this.reportFeedbackRepository.create({
                id: '',
                title,
                content,
                authorName,
                type: normalizedType,
                status,
                createdAt: new Date(),
            });
            return result;
        } catch (error) {
            throw new Error('Error creating report or feedback: ' + (error as any).message);
        }
    }

    async findAllByType(type: ReportFeedbackType): Promise<ReportFeedback[]> {
        try {
            const normalizedType = type.toUpperCase() as ReportFeedbackType;
            return this.reportFeedbackRepository.findAllByType(normalizedType);
        } catch (error) {
            throw new Error('Error finding all by type: ' + (error as any).message);
        }
    }

    async findById(id: string): Promise<ReportFeedback | null> {
        try {
            return this.reportFeedbackRepository.findById(id);
        } catch (error) {
            throw new Error('Error finding by id: ' + (error as any).message);
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            return this.reportFeedbackRepository.deleteById(id);
        } catch (error) {
            throw new Error('Error deleting by id: ' + (error as any).message);
        }
    }

    async updateStatusById(id: string, status: ReportFeedbackStatus): Promise<ReportFeedback> {
        try {
            const normalizedStatus = status.toUpperCase() as ReportFeedbackStatus;
            return this.reportFeedbackRepository.updateStatusById(id, { status: normalizedStatus });
        } catch (error) {
            throw new Error('Error updating status by id: ' + (error as any).message);
        }
    }
}

export { ReportFeedbackUseCase };

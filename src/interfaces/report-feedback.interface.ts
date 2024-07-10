import { ReportFeedback as PrismaReportFeedback, ReportFeedbackType as PrismaReportFeedbackType } from "@prisma/client";

export type ReportFeedbackType = PrismaReportFeedbackType;

export interface ReportFeedback extends PrismaReportFeedback {
    // Mapeamento direto do modelo Prisma
}

export interface ReportFeedbackCreate {
    title: string;
    content: string;
    authorName: string;
    type: ReportFeedbackType;
}

export interface ReportFeedbackRepository {
    create(data: ReportFeedbackCreate): Promise<ReportFeedback>;
    findAllByType(type: ReportFeedbackType): Promise<ReportFeedback[]>;
    deleteById(id: string): Promise<void>;
}

import { ReportFeedback as PrismaReportFeedback, ReportFeedbackStatus as PrismaReportFeedbackStatus, ReportFeedbackType as PrismaReportFeedbackType } from "@prisma/client";

export type ReportFeedbackType = PrismaReportFeedbackType;
export type ReportFeedbackStatus = PrismaReportFeedbackStatus;

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
    create(data: ReportFeedback): Promise<ReportFeedback>;
    findAllByType(type: ReportFeedbackType): Promise<ReportFeedback[]>;
    deleteById(id: string): Promise<void>;
}

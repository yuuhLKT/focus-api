import { Comment as PrismaComment } from "@prisma/client";

export interface CommentCreate {
    commentTitle: string;
    content: string;
    authorName: string;
    reportFeedbackId: string;
}

export interface CommentRepository {
    create(data: CommentCreate): Promise<PrismaComment>;
    findCommentById(tempId: string): Promise<PrismaComment | null>;
    findByFeedbackReportId(tempId: string): Promise<PrismaComment | null>;
    deleteById(tempId: string): Promise<void>;
}

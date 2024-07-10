-- CreateEnum
CREATE TYPE "ReportFeedbackType" AS ENUM ('BUG', 'FEEDBACK');

-- CreateTable
CREATE TABLE "report_feedbacks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorName" TEXT NOT NULL,
    "type" "ReportFeedbackType" NOT NULL,

    CONSTRAINT "report_feedbacks_pkey" PRIMARY KEY ("id")
);

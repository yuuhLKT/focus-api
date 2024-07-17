-- CreateEnum
CREATE TYPE "ReportFeedbackType" AS ENUM ('BUG', 'FEEDBACK');

-- CreateEnum
CREATE TYPE "ReportFeedbackStatus" AS ENUM ('OPEN', 'WORKING', 'SOLVED', 'FEEDBACK');

-- CreateTable
CREATE TABLE "report_feedbacks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorName" TEXT NOT NULL,
    "type" "ReportFeedbackType" NOT NULL,
    "status" "ReportFeedbackStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "report_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "commentTitle" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportFeedbackId" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_reportFeedbackId_fkey" FOREIGN KEY ("reportFeedbackId") REFERENCES "report_feedbacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

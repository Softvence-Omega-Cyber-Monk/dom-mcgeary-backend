/*
  Warnings:

  - You are about to drop the column `challenges` on the `AstrologicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `corePersonality` on the `AstrologicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `element` on the `AstrologicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `strengths` on the `AstrologicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `astrologicalProfileId` on the `AvoidanceZone` table. All the data in the column will be lost.
  - You are about to drop the column `astrologicalProfileId` on the `CosmicGreenLight` table. All the data in the column will be lost.
  - You are about to drop the column `astrologicalProfileId` on the `OptimalTiming` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AstrologicalProfile" DROP CONSTRAINT "AstrologicalProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AvoidanceZone" DROP CONSTRAINT "AvoidanceZone_astrologicalProfileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CosmicGreenLight" DROP CONSTRAINT "CosmicGreenLight_astrologicalProfileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OptimalTiming" DROP CONSTRAINT "OptimalTiming_astrologicalProfileId_fkey";

-- AlterTable
ALTER TABLE "AstrologicalProfile" DROP COLUMN "challenges",
DROP COLUMN "corePersonality",
DROP COLUMN "element",
DROP COLUMN "strengths",
ADD COLUMN     "birthDate" TEXT,
ADD COLUMN     "birthLocation" TEXT,
ADD COLUMN     "birthTime" TEXT,
ALTER COLUMN "westernSign" DROP NOT NULL,
ALTER COLUMN "chineseSign" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AvoidanceZone" DROP COLUMN "astrologicalProfileId",
ADD COLUMN     "resultId" TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CosmicGreenLight" DROP COLUMN "astrologicalProfileId",
ADD COLUMN     "resultId" TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OptimalTiming" DROP COLUMN "astrologicalProfileId",
ADD COLUMN     "resultId" TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "corePersonality" TEXT,
    "strengths" TEXT[],
    "challenges" TEXT[],
    "element" TEXT,
    "astrologicalProfileId" TEXT,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapOverview" (
    "id" TEXT NOT NULL,
    "astrologicalProfileId" TEXT,

    CONSTRAINT "RoadmapOverview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MajorTheme" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "dateRange" TEXT,
    "roadmapOverviewId" TEXT,

    CONSTRAINT "MajorTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionWindow" (
    "id" TEXT NOT NULL,
    "dateRange" TEXT,
    "description" TEXT,
    "roadmapOverviewId" TEXT,

    CONSTRAINT "ActionWindow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CautionPeriod" (
    "id" TEXT NOT NULL,
    "dateRange" TEXT,
    "description" TEXT,
    "roadmapOverviewId" TEXT,

    CONSTRAINT "CautionPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_astrologicalProfileId_key" ON "Result"("astrologicalProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "RoadmapOverview_astrologicalProfileId_key" ON "RoadmapOverview"("astrologicalProfileId");

-- AddForeignKey
ALTER TABLE "AstrologicalProfile" ADD CONSTRAINT "AstrologicalProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_astrologicalProfileId_fkey" FOREIGN KEY ("astrologicalProfileId") REFERENCES "AstrologicalProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CosmicGreenLight" ADD CONSTRAINT "CosmicGreenLight_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimalTiming" ADD CONSTRAINT "OptimalTiming_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvoidanceZone" ADD CONSTRAINT "AvoidanceZone_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapOverview" ADD CONSTRAINT "RoadmapOverview_astrologicalProfileId_fkey" FOREIGN KEY ("astrologicalProfileId") REFERENCES "AstrologicalProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MajorTheme" ADD CONSTRAINT "MajorTheme_roadmapOverviewId_fkey" FOREIGN KEY ("roadmapOverviewId") REFERENCES "RoadmapOverview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionWindow" ADD CONSTRAINT "ActionWindow_roadmapOverviewId_fkey" FOREIGN KEY ("roadmapOverviewId") REFERENCES "RoadmapOverview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CautionPeriod" ADD CONSTRAINT "CautionPeriod_roadmapOverviewId_fkey" FOREIGN KEY ("roadmapOverviewId") REFERENCES "RoadmapOverview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

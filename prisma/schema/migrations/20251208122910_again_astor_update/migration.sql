/*
  Warnings:

  - You are about to drop the column `birthDate` on the `AstrologicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `birthLocation` on the `AstrologicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `birthTime` on the `AstrologicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `chineseSign` on the `AstrologicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `westernSign` on the `AstrologicalProfile` table. All the data in the column will be lost.
  - You are about to drop the `ActionWindow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvoidanceZone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CautionPeriod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CosmicGreenLight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MajorTheme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OptimalTiming` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoadmapOverview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ActionWindow" DROP CONSTRAINT "ActionWindow_roadmapOverviewId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AvoidanceZone" DROP CONSTRAINT "AvoidanceZone_resultId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CautionPeriod" DROP CONSTRAINT "CautionPeriod_roadmapOverviewId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CosmicGreenLight" DROP CONSTRAINT "CosmicGreenLight_resultId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MajorTheme" DROP CONSTRAINT "MajorTheme_roadmapOverviewId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OptimalTiming" DROP CONSTRAINT "OptimalTiming_resultId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Result" DROP CONSTRAINT "Result_astrologicalProfileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoadmapOverview" DROP CONSTRAINT "RoadmapOverview_astrologicalProfileId_fkey";

-- AlterTable
ALTER TABLE "AstrologicalProfile" DROP COLUMN "birthDate",
DROP COLUMN "birthLocation",
DROP COLUMN "birthTime",
DROP COLUMN "chineseSign",
DROP COLUMN "westernSign",
ADD COLUMN     "birth_date" TEXT,
ADD COLUMN     "birth_location" TEXT,
ADD COLUMN     "birth_time" TEXT,
ADD COLUMN     "chinese_sign" TEXT,
ADD COLUMN     "result" JSONB,
ADD COLUMN     "roadmap_overview" JSONB,
ADD COLUMN     "western_sign" TEXT;

-- DropTable
DROP TABLE "public"."ActionWindow";

-- DropTable
DROP TABLE "public"."AvoidanceZone";

-- DropTable
DROP TABLE "public"."CautionPeriod";

-- DropTable
DROP TABLE "public"."CosmicGreenLight";

-- DropTable
DROP TABLE "public"."MajorTheme";

-- DropTable
DROP TABLE "public"."OptimalTiming";

-- DropTable
DROP TABLE "public"."Result";

-- DropTable
DROP TABLE "public"."RoadmapOverview";

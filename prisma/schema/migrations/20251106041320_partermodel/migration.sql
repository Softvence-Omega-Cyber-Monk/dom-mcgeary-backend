-- CreateEnum
CREATE TYPE "relationType" AS ENUM ('WIFE', 'GIRL_FRIEND');

-- CreateTable
CREATE TABLE "PartnerInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TEXT,
    "birthTime" TEXT,
    "birthLocation" TEXT,
    "relationType" "relationType" NOT NULL DEFAULT 'WIFE',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnerInfo_userId_key" ON "PartnerInfo"("userId");

-- AddForeignKey
ALTER TABLE "PartnerInfo" ADD CONSTRAINT "PartnerInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

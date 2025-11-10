-- CreateEnum
CREATE TYPE "relationType" AS ENUM ('WIFE', 'GIRL_FRIEND');

-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('PRO_USER', 'USER', 'ADMIN');

-- CreateTable
CREATE TABLE "OtpCode" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "birthTime" TEXT NOT NULL,
    "birthLocation" TEXT NOT NULL,
    "relationType" "relationType" NOT NULL DEFAULT 'WIFE',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "profileImage" TEXT,
    "password" TEXT NOT NULL,
    "birthDate" TEXT,
    "birthTime" TEXT,
    "birthLocation" TEXT,
    "timeZone" TEXT,
    "role" "userRole" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnerInfo_userId_key" ON "PartnerInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PartnerInfo" ADD CONSTRAINT "PartnerInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

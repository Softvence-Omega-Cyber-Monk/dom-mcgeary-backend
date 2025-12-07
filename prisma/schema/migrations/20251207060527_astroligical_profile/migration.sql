-- CreateTable
CREATE TABLE "AstrologicalProfile" (
    "id" TEXT NOT NULL,
    "westernSign" TEXT NOT NULL,
    "chineseSign" TEXT NOT NULL,
    "corePersonality" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "strengths" TEXT[],
    "challenges" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "AstrologicalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CosmicGreenLight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "astrologicalProfileId" TEXT NOT NULL,

    CONSTRAINT "CosmicGreenLight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptimalTiming" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "astrologicalProfileId" TEXT NOT NULL,

    CONSTRAINT "OptimalTiming_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvoidanceZone" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "astrologicalProfileId" TEXT NOT NULL,

    CONSTRAINT "AvoidanceZone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AstrologicalProfile_userId_key" ON "AstrologicalProfile"("userId");

-- AddForeignKey
ALTER TABLE "AstrologicalProfile" ADD CONSTRAINT "AstrologicalProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CosmicGreenLight" ADD CONSTRAINT "CosmicGreenLight_astrologicalProfileId_fkey" FOREIGN KEY ("astrologicalProfileId") REFERENCES "AstrologicalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimalTiming" ADD CONSTRAINT "OptimalTiming_astrologicalProfileId_fkey" FOREIGN KEY ("astrologicalProfileId") REFERENCES "AstrologicalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvoidanceZone" ADD CONSTRAINT "AvoidanceZone_astrologicalProfileId_fkey" FOREIGN KEY ("astrologicalProfileId") REFERENCES "AstrologicalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

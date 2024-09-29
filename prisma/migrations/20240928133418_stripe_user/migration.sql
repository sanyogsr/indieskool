-- CreateTable
CREATE TABLE "UserTutorial" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tutorialId" INTEGER NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTutorial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTutorial_userId_tutorialId_key" ON "UserTutorial"("userId", "tutorialId");

-- AddForeignKey
ALTER TABLE "UserTutorial" ADD CONSTRAINT "UserTutorial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTutorial" ADD CONSTRAINT "UserTutorial_tutorialId_fkey" FOREIGN KEY ("tutorialId") REFERENCES "Tutorial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

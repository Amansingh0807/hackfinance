-- CreateTable
CREATE TABLE "savings" (
    "id" TEXT NOT NULL,
    "goalAmount" DECIMAL(65,30) NOT NULL,
    "currentAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "description" TEXT,
    "motive" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "savings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "savings_userId_idx" ON "savings"("userId");

-- AddForeignKey
ALTER TABLE "savings" ADD CONSTRAINT "savings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

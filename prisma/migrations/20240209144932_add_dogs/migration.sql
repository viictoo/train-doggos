-- CreateEnum
CREATE TYPE "SKill" AS ENUM ('GUARD', 'PET', 'HUNTER', 'SEARCH_AND_RESCUE', 'SERVICE');

-- CreateTable
CREATE TABLE "Dogs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "role" "SKill" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dogs_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - The values [GUARD,PET,HUNTER,SEARCH_AND_RESCUE,SERVICE] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('BASIC_TRAINER', 'BEHAVIOR_SPECIALIST', 'PUPPY_TRAINER', 'ADULT_DOG_TRAINER', 'SERVICE_DOG_TRAINER');
ALTER TABLE "Trainer" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

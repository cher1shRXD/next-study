/*
  Warnings:

  - You are about to drop the column `authorId` on the `board` table. All the data in the column will be lost.
  - Added the required column `userId` to the `board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `board` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

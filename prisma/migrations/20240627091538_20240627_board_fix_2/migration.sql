/*
  Warnings:

  - You are about to alter the column `authorId` on the `board` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `board` MODIFY `authorId` INTEGER NOT NULL;

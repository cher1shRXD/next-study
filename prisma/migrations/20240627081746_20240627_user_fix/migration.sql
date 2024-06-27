/*
  Warnings:

  - A unique constraint covering the columns `[stId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_stId_key` ON `user`(`stId`);

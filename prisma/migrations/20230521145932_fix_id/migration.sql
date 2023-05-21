/*
  Warnings:

  - Added the required column `teacherId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "office" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "Lesson_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Lesson" ("day", "id", "office", "order", "title", "type") SELECT "day", "id", "office", "order", "title", "type" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

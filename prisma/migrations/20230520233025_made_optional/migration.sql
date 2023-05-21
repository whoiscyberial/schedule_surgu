-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "fullName" TEXT NOT NULL PRIMARY KEY,
    "job" TEXT,
    "email" TEXT,
    "description" TEXT
);
INSERT INTO "new_Teacher" ("description", "email", "fullName", "job") SELECT "description", "email", "fullName", "job" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_fullName_key" ON "Teacher"("fullName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

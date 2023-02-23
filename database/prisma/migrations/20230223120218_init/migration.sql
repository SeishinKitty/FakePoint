-- CreateTable
CREATE TABLE "ListItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ListRelatedItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "relatedId" TEXT,
    CONSTRAINT "ListRelatedItem_relatedId_fkey" FOREIGN KEY ("relatedId") REFERENCES "ListItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

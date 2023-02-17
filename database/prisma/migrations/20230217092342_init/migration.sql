-- CreateTable
CREATE TABLE "ListItem" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ListRelatedItem" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Title" TEXT NOT NULL,
    "RelatedId" TEXT NOT NULL,
    CONSTRAINT "ListRelatedItem_RelatedId_fkey" FOREIGN KEY ("RelatedId") REFERENCES "ListItem" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ListItem_Title_key" ON "ListItem"("Title");

-- CreateIndex
CREATE UNIQUE INDEX "ListRelatedItem_Title_key" ON "ListRelatedItem"("Title");

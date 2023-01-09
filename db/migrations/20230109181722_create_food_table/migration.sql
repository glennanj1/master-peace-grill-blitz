-- CreateTable
CREATE TABLE "Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "details" TEXT NOT NULL,
    "add_ons" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Promo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "discountType" TEXT NOT NULL,
    "discountValue" REAL NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true
);

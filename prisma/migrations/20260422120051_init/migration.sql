-- CreateTable
CREATE TABLE "Therapist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "clinicName" TEXT,
    "address" TEXT,
    "imageUrl" TEXT,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Symptom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT
);

-- CreateTable
CREATE TABLE "_SymptomToTherapist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SymptomToTherapist_A_fkey" FOREIGN KEY ("A") REFERENCES "Symptom" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SymptomToTherapist_B_fkey" FOREIGN KEY ("B") REFERENCES "Therapist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Symptom_name_key" ON "Symptom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SymptomToTherapist_AB_unique" ON "_SymptomToTherapist"("A", "B");

-- CreateIndex
CREATE INDEX "_SymptomToTherapist_B_index" ON "_SymptomToTherapist"("B");

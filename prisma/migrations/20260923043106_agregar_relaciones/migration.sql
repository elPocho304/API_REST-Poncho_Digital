/*
  Warnings:

  - A unique constraint covering the columns `[standId]` on the table `Artesano` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rolId` to the `Artesano` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artesano" ADD COLUMN     "rolId" INTEGER NOT NULL,
ADD COLUMN     "standId" INTEGER;

-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "artesanoId" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stand" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "pabellon" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Stand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Artesano_standId_key" ON "Artesano"("standId");

-- AddForeignKey
ALTER TABLE "Artesano" ADD CONSTRAINT "Artesano_standId_fkey" FOREIGN KEY ("standId") REFERENCES "Stand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artesano" ADD CONSTRAINT "Artesano_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_artesanoId_fkey" FOREIGN KEY ("artesanoId") REFERENCES "Artesano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `artesanos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `solicitud_id` column on the `artesanos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `asignacion_stand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pabellones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `productos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `registro_consulta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `usuario_id` column on the `registro_consulta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `sectores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `solicitud_registro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `resuelta_por_id` column on the `solicitud_registro` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `stands` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `artesanos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuario_id` on the `artesanos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `asignacion_stand` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `artesano_id` on the `asignacion_stand` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stand_id` on the `asignacion_stand` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `pabellones` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `productos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `artesano_id` on the `productos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `registro_consulta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `sectores` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pabellon_id` on the `sectores` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `solicitud_registro` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `usuario_id` on the `solicitud_registro` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `stands` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sector_id` on the `stands` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `usuarios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "RolUsuario" ADD VALUE 'PENDIENTE';

-- DropForeignKey
ALTER TABLE "artesanos" DROP CONSTRAINT "artesanos_solicitud_id_fkey";

-- DropForeignKey
ALTER TABLE "artesanos" DROP CONSTRAINT "artesanos_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "asignacion_stand" DROP CONSTRAINT "asignacion_stand_artesano_id_fkey";

-- DropForeignKey
ALTER TABLE "asignacion_stand" DROP CONSTRAINT "asignacion_stand_stand_id_fkey";

-- DropForeignKey
ALTER TABLE "productos" DROP CONSTRAINT "productos_artesano_id_fkey";

-- DropForeignKey
ALTER TABLE "registro_consulta" DROP CONSTRAINT "registro_consulta_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "sectores" DROP CONSTRAINT "sectores_pabellon_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitud_registro" DROP CONSTRAINT "solicitud_registro_resuelta_por_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitud_registro" DROP CONSTRAINT "solicitud_registro_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "stands" DROP CONSTRAINT "stands_sector_id_fkey";

-- AlterTable
ALTER TABLE "artesanos" DROP CONSTRAINT "artesanos_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "usuario_id",
ADD COLUMN     "usuario_id" UUID NOT NULL,
DROP COLUMN "solicitud_id",
ADD COLUMN     "solicitud_id" UUID,
ADD CONSTRAINT "artesanos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "asignacion_stand" DROP CONSTRAINT "asignacion_stand_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "artesano_id",
ADD COLUMN     "artesano_id" UUID NOT NULL,
DROP COLUMN "stand_id",
ADD COLUMN     "stand_id" UUID NOT NULL,
ADD CONSTRAINT "asignacion_stand_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "pabellones" DROP CONSTRAINT "pabellones_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "pabellones_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "productos" DROP CONSTRAINT "productos_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "artesano_id",
ADD COLUMN     "artesano_id" UUID NOT NULL,
ADD CONSTRAINT "productos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "registro_consulta" DROP CONSTRAINT "registro_consulta_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "usuario_id",
ADD COLUMN     "usuario_id" UUID,
ADD CONSTRAINT "registro_consulta_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sectores" DROP CONSTRAINT "sectores_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "pabellon_id",
ADD COLUMN     "pabellon_id" UUID NOT NULL,
ADD CONSTRAINT "sectores_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "solicitud_registro" DROP CONSTRAINT "solicitud_registro_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "usuario_id",
ADD COLUMN     "usuario_id" UUID NOT NULL,
DROP COLUMN "resuelta_por_id",
ADD COLUMN     "resuelta_por_id" UUID,
ADD CONSTRAINT "solicitud_registro_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "stands" DROP CONSTRAINT "stands_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "sector_id",
ADD COLUMN     "sector_id" UUID NOT NULL,
ADD CONSTRAINT "stands_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "artesanos_usuario_id_key" ON "artesanos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "artesanos_solicitud_id_key" ON "artesanos"("solicitud_id");

-- CreateIndex
CREATE INDEX "asignacion_stand_artesano_id_idx" ON "asignacion_stand"("artesano_id");

-- CreateIndex
CREATE INDEX "asignacion_stand_stand_id_idx" ON "asignacion_stand"("stand_id");

-- CreateIndex
CREATE INDEX "productos_artesano_id_idx" ON "productos"("artesano_id");

-- CreateIndex
CREATE INDEX "registro_consulta_usuario_id_idx" ON "registro_consulta"("usuario_id");

-- CreateIndex
CREATE INDEX "sectores_pabellon_id_idx" ON "sectores"("pabellon_id");

-- CreateIndex
CREATE INDEX "stands_sector_id_idx" ON "stands"("sector_id");

-- AddForeignKey
ALTER TABLE "solicitud_registro" ADD CONSTRAINT "solicitud_registro_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_registro" ADD CONSTRAINT "solicitud_registro_resuelta_por_id_fkey" FOREIGN KEY ("resuelta_por_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artesanos" ADD CONSTRAINT "artesanos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artesanos" ADD CONSTRAINT "artesanos_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitud_registro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_artesano_id_fkey" FOREIGN KEY ("artesano_id") REFERENCES "artesanos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sectores" ADD CONSTRAINT "sectores_pabellon_id_fkey" FOREIGN KEY ("pabellon_id") REFERENCES "pabellones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stands" ADD CONSTRAINT "stands_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion_stand" ADD CONSTRAINT "asignacion_stand_artesano_id_fkey" FOREIGN KEY ("artesano_id") REFERENCES "artesanos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion_stand" ADD CONSTRAINT "asignacion_stand_stand_id_fkey" FOREIGN KEY ("stand_id") REFERENCES "stands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registro_consulta" ADD CONSTRAINT "registro_consulta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

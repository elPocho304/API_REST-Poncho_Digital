-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMINISTRADOR', 'ARTESANO');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('PENDIENTE', 'APROBADA', 'RECHAZADA', 'MODIFICACION_SOLICITADA');

-- CreateEnum
CREATE TYPE "EstadoStand" AS ENUM ('DISPONIBLE', 'OCUPADO', 'MANTENIMIENTO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitud_registro" (
    "id" SERIAL NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'PENDIENTE',
    "usuario_id" INTEGER NOT NULL,
    "nombre_emprendimiento" TEXT NOT NULL,
    "rubro" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "descripcion" TEXT,
    "comentario_admin" TEXT,
    "fecha_solicitud" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_resolucion" TIMESTAMP(3),
    "resuelta_por_id" INTEGER,

    CONSTRAINT "solicitud_registro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artesanos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "solicitud_id" INTEGER,
    "nombre_emprendimiento" TEXT NOT NULL,
    "rubro" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "trayectoria" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artesanos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "artesano_id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pabellones" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "pabellones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "pabellon_id" INTEGER NOT NULL,

    CONSTRAINT "sectores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stands" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "sector_id" INTEGER NOT NULL,
    "estado" "EstadoStand" NOT NULL DEFAULT 'DISPONIBLE',

    CONSTRAINT "stands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asignacion_stand" (
    "id" SERIAL NOT NULL,
    "artesano_id" INTEGER NOT NULL,
    "stand_id" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_fin" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "asignacion_stand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registro_consulta" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "metodo_busqueda" TEXT NOT NULL,
    "filtros_aplicados" TEXT,
    "endpoint_consultado" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registro_consulta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_rol_idx" ON "usuarios"("rol");

-- CreateIndex
CREATE INDEX "solicitud_registro_estado_idx" ON "solicitud_registro"("estado");

-- CreateIndex
CREATE INDEX "solicitud_registro_localidad_idx" ON "solicitud_registro"("localidad");

-- CreateIndex
CREATE INDEX "solicitud_registro_rubro_idx" ON "solicitud_registro"("rubro");

-- CreateIndex
CREATE UNIQUE INDEX "artesanos_usuario_id_key" ON "artesanos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "artesanos_solicitud_id_key" ON "artesanos"("solicitud_id");

-- CreateIndex
CREATE INDEX "artesanos_localidad_idx" ON "artesanos"("localidad");

-- CreateIndex
CREATE INDEX "artesanos_rubro_idx" ON "artesanos"("rubro");

-- CreateIndex
CREATE INDEX "productos_artesano_id_idx" ON "productos"("artesano_id");

-- CreateIndex
CREATE UNIQUE INDEX "pabellones_nombre_key" ON "pabellones"("nombre");

-- CreateIndex
CREATE INDEX "sectores_pabellon_id_idx" ON "sectores"("pabellon_id");

-- CreateIndex
CREATE UNIQUE INDEX "stands_numero_key" ON "stands"("numero");

-- CreateIndex
CREATE INDEX "stands_sector_id_idx" ON "stands"("sector_id");

-- CreateIndex
CREATE INDEX "stands_estado_idx" ON "stands"("estado");

-- CreateIndex
CREATE INDEX "asignacion_stand_artesano_id_idx" ON "asignacion_stand"("artesano_id");

-- CreateIndex
CREATE INDEX "asignacion_stand_stand_id_idx" ON "asignacion_stand"("stand_id");

-- CreateIndex
CREATE INDEX "registro_consulta_usuario_id_idx" ON "registro_consulta"("usuario_id");

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

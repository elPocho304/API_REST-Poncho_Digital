-- CreateTable
CREATE TABLE "Artesano" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "localidad" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artesano_pkey" PRIMARY KEY ("id")
);

-- Make pending accounts role-less before removing PENDIENTE from the enum.
ALTER TABLE "usuarios" ALTER COLUMN "rol" DROP NOT NULL;

UPDATE "usuarios"
SET "rol" = NULL
WHERE "rol" = 'PENDIENTE';

ALTER TYPE "RolUsuario" RENAME TO "RolUsuario_old";

CREATE TYPE "RolUsuario" AS ENUM ('ADMINISTRADOR', 'ARTESANO');

ALTER TABLE "usuarios"
ALTER COLUMN "rol" TYPE "RolUsuario"
USING ("rol"::text::"RolUsuario");

DROP TYPE "RolUsuario_old";

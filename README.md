# API Poncho Digital

API REST para gestionar artesanos, productos, pabellones, sectores y stands de Poncho Digital.

## Integrantes

- Toledo, Jose Rafael - MU:00359
- Ramos, Gonzalo Esteban - MU:00333

## Requisitos

- Node.js 24 LTS
- npm (incluido con Node.js)

## Instalación

Verificar que Node.js y npm estén instalados:

node --version
npm --version

Instalar las dependencias del proyecto:

npm install


## Ejecución


npm run dev


La API queda disponible en `http://localhost:3000`.

## Endpoints

Todas las respuestas utilizan formato JSON.

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Verifica que el servicio esté funcionando. |
| GET | `/artesanos` | Lista artesanos. Acepta filtros `nombreEmprendimiento`, `rubro` y `localidad`, orden `ordenPor`/`orden` y paginación `pagina`/`limite` (máximo 100). |
| GET | `/artesanos/:id` | Obtiene un artesano por ID. |
| PUT | `/artesanos/:id` | Actualiza un artesano. Requiere `nombre`, `dni`, `localidad`, `descripcion` y `estado`. |
| DELETE | `/artesanos/:id` | Elimina un artesano. |
| GET | `/productos` | Lista todos los productos. Acepta filtros `nombre`, `descripcion`, `precio` y `categoria`. |
| GET | `/productos/:id` | Obtiene un producto por ID. |
| POST | `/productos/agregar` | Crea un producto como artesano autenticado. Requiere `nombre` y `precio`; el propietario se obtiene de la cuenta. |
| PATCH | `/productos/actualizar/:id` | Actualiza un producto propio; un producto de otro artesano responde `404`. |
| DELETE | `/productos/eliminar/:id` | Elimina un producto propio; un producto de otro artesano responde `404`. |
| GET | `/roles` | Lista todos los roles. Acepta el filtro `nombre`. |
| GET | `/roles/:id` | Obtiene un rol por ID. |
| POST | `/roles` | Crea un rol. Requiere `nombre`. |
| PUT | `/roles/:id` | Actualiza un rol. |
| DELETE | `/roles/:id` | Elimina un rol. |
| GET | `/stands` | Lista todos los stands. Acepta filtros `nombre`, `descripcion`, `pabellon`, `sector`, `estado`, `latitud` y `longitud`. |
| GET | `/stands/:id` | Obtiene un stand por ID. |
| POST | `/stands` | Crea un stand. |
| PUT | `/stands/:id` | Actualiza un stand. |
| DELETE | `/stands/:id` | Elimina un stand. |
| GET | `/pabellones/obtener` | Lista pabellones. Acepta `nombre`, `pagina` y `limite`. |
| GET | `/pabellones/obtenerPorId/:id` | Obtiene un pabellón por UUID, con sus sectores. |
| POST | `/pabellones/agregar` | Crea un pabellón. Requiere `nombre`; acepta `descripcion`. |
| PATCH | `/pabellones/actualizar/:id` | Actualiza `nombre` y/o `descripcion` de un pabellón. |
| DELETE | `/pabellones/eliminar/:id` | Elimina un pabellón si no tiene sectores asociados. |
| GET | `/sectores/obtener` | Lista sectores. Acepta `pabellonId`, `nombre`, `pagina` y `limite`. |
| GET | `/sectores/obtenerPorId/:id` | Obtiene un sector por UUID, con su pabellón y stands. |
| POST | `/sectores/agregar` | Crea un sector. Requiere `nombre` y `pabellonId`. |
| PATCH | `/sectores/actualizar/:id` | Actualiza `nombre` y/o `pabellonId` de un sector. |
| DELETE | `/sectores/eliminar/:id` | Elimina un sector si no tiene stands asociados. |
| GET | `/solicitudes-registro/obtener` | Lista solicitudes. Acepta filtros `estado`, `usuarioId`, `resueltaPorId`, `nombreEmprendimiento`, `rubro` y `localidad`; orden `ordenPor`/`orden` y paginación `pagina`/`limite`. |
| GET | `/solicitudes-registro/obtenerPorId/:id` | Obtiene una solicitud de registro por UUID. |
| DELETE | `/solicitudes-registro/eliminar/:id` | Elimina una solicitud de registro por UUID. |
| POST | `/asignaciones-stand/asignar` | Asigna un stand existente y disponible a un artesano. Requiere `artesanoId` y `standId`. |
| GET | `/asignaciones-stand/obtener` | Lista asignaciones. Acepta filtros `artesanoId`, `standId` y `activo`; orden `ordenPor`/`orden` y paginación `pagina`/`limite`. |
| GET | `/asignaciones-stand/obtenerPorId/:id` | Obtiene una asignación por UUID, con datos del artesano, stand, sector y pabellón. |
| PATCH | `/asignaciones-stand/actualizar/:id` | Activa o desactiva una asignación. Requiere `activo` booleano; al desactivar, libera el stand si no quedan otras asignaciones activas. |
| DELETE | `/asignaciones-stand/eliminar/:id` | Elimina una asignación por UUID y libera el stand si no tiene otra asignación activa. |
| GET | `/productos/mis-productos` | Lista los productos del artesano autenticado; ignora el filtro de propietario enviado por el cliente. |
| PATCH | `/solicitudes-registro/resolver/:id` | Resuelve una solicitud como `APROBADA`, `RECHAZADA` o `MODIFICACION_SOLICITADA`; solo administradores. |
| POST | `/usuarios/administradores` | Crea una cuenta de administrador; solo administradores. |
| PATCH | `/usuarios/:id/activo` | Activa o desactiva una cuenta con `{ "activo": true/false }`; solo administradores. No permite desactivar al último administrador activo. |

## Autenticación y autorización

`POST /autenticacion/registro` crea una cuenta `PENDIENTE` y su solicitud de registro. `POST /autenticacion/login` entrega un JWT de 15 minutos con el ID y el rol emitido. En cada ruta protegida, la API vuelve a consultar el usuario para aplicar el rol y estado vigentes; una cuenta inactiva no puede iniciar sesión y tampoco puede usar tokens anteriores.

Enviar el token en `Authorization: Bearer <token>`. Las consultas públicas de artesanos, productos y stands no requieren token. La administración de pabellones, sectores, stands, solicitudes, asignaciones y cuentas requiere `ADMINISTRADOR`. Las altas, modificaciones y bajas de productos requieren `ARTESANO`; el propietario se toma de la cuenta autenticada, no del cuerpo de la solicitud. Si aún no existe un administrador, la primera cuenta debe aprovisionarse fuera de la API; luego los administradores pueden crear otras cuentas administrativas.

Una autenticación correcta no otorga permisos automáticamente: los endpoints reservados a otros roles responden `403`. Un login de cuenta inexistente, inactiva o con contraseña incorrecta responde `401` con un mensaje genérico.

Al aprobar una solicitud, la API crea el perfil de artesano y cambia el rol de la cuenta dentro de una misma transacción. Rechazar una solicitud o pedir modificaciones no habilita operaciones de artesano.

## Ejemplos de cuerpos JSON


### Crear un producto

{
  "nombre": "Collar artesanal",
  "descripcion": "Collar realizado en plata",
  "precio": 25000
}

## Respuestas de error

- `400 Bad Request`: el ID no es un entero positivo o faltan datos obligatorios.
- `404 Not Found`: no existe un recurso con el ID indicado.
- `409 Conflict`: el recurso ya existe, una solicitud ya fue resuelta, o no se puede desactivar al último administrador activo.
- `401 Unauthorized` / `403 Forbidden`: falta una autenticación válida, o la cuenta/rol no tiene acceso al endpoint.

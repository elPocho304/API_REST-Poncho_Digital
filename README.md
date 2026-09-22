# API Poncho Digital

API REST para gestionar artesanos, productos, roles y stands de Poncho Digital.

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
| GET | `/artesanos` | Lista todos los artesanos. Acepta filtros `nombre`, `dni`, `localidad`, `descripcion` y `estado`. |
| GET | `/artesanos/:id` | Obtiene un artesano por ID. |
| POST | `/artesanos` | Crea un artesano. Requiere `nombre`, `dni`, `localidad` y `estado`. |
| PUT | `/artesanos/:id` | Actualiza un artesano. Requiere `nombre`, `dni`, `localidad`, `descripcion` y `estado`. |
| DELETE | `/artesanos/:id` | Elimina un artesano. |
| GET | `/productos` | Lista todos los productos. Acepta filtros `nombre`, `descripcion`, `precio` y `categoria`. |
| GET | `/productos/:id` | Obtiene un producto por ID. |
| POST | `/productos` | Crea un producto. Requiere `nombre`, `precio` y `categoria`. |
| PUT | `/productos/:id` | Actualiza un producto. |
| DELETE | `/productos/:id` | Elimina un producto. |
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

## Ejemplos de cuerpos JSON

### Crear un artesano


{
	"nombre": "María González",
	"dni": "25436789",
	"localidad": "Córdoba",
	"descripcion": "Creadora de joyería artesanal",
	"estado": "activo"
}


### Crear un producto

{
	"nombre": "Collar artesanal",
	"descripcion": "Collar realizado en plata",
	"precio": 25000,
	"categoria": "Joyería"
}

## Respuestas de error

- `400 Bad Request`: el ID no es un entero positivo o faltan datos obligatorios.
- `404 Not Found`: no existe un recurso con el ID indicado.

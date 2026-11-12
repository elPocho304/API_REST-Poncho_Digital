import express from "express";
import artesanosRoutes from "./routes/artesanos.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import standsRoutes from "./routes/stands.routes.js";
import pabellonesRoutes from "./routes/pabellones.routes.js";
import sectoresRoutes from "./routes/sectores.routes.js";
import autenticacionRoutes from "./routes/autenticacion.routes.js";
import solicitudRegistroRoutes from "./routes/solicitudRegistro.routes.js";
import asignacionesStandRoutes from "./routes/asignacionesStand.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import "./config/jwt.js";
import { manejadorErrores } from './middlewares/manejadorErrores.js';
import { rutaNoEncontrada } from "./middlewares/noEncontrado.js";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "node:fs";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get(
  '/',
  /*
  #swagger.tags = ['Estado del servicio']
  #swagger.summary = 'Verificar disponibilidad de la API'
  #swagger.description = 'Devuelve un mensaje cuando el servicio está en funcionamiento.'
  #swagger.security = []
  #swagger.responses[200] = {
    description: 'El servicio está disponible.',
    content: { 'text/html': { schema: { type: 'string', example: 'Bienvenido a la API de Poncho Digital. El servicio está funcionando correctamente.' } } }
  }
*/
  (req, res) => {
  res.send('Bienvenido a la API de Poncho Digital. El servicio está funcionando correctamente.');
  },
);

app.use("/productos", productosRoutes);
app.use("/stands", standsRoutes);
app.use("/pabellones", pabellonesRoutes);
app.use("/sectores", sectoresRoutes);
app.use("/artesanos", artesanosRoutes);
app.use("/autenticacion", autenticacionRoutes);
app.use("/solicitudes-registro", solicitudRegistroRoutes);
app.use("/asignaciones-stand", asignacionesStandRoutes);
app.use("/usuarios", usuariosRoutes);

const swaggerDocument = JSON.parse(
readFileSync(new URL("../swagger-output.json", import.meta.url), "utf8"),
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(rutaNoEncontrada);


app.use(manejadorErrores);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
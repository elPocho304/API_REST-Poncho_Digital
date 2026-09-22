import express from "express";
import artesanosRoutes from "./routes/artesanos.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import rolesRoutes from "./routes/roles.routes.js"
import standsRoutes from "./routes/stands.routes.js"
import { manejadorErrores } from './middlewares/manejadorErrores.js';
import { rutaNoEncontrada } from "./middlewares/noEncontrado.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Poncho Digital. El servicio está funcionando correctamente.');
});

app.use("/productos", productosRoutes);
app.use("/roles", rolesRoutes);
app.use("/stands", standsRoutes);
app.use("/artesanos", artesanosRoutes);

app.use(rutaNoEncontrada)
app.use(manejadorErrores);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
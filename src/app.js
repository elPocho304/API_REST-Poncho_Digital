import express from 'express';
import productosRoutes from './routes/productos.routes.js';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/productos", productosRoutes);

app.get('/info', (req, res) => {
  res.send('Bienvenido a la API de Poncho Digital. El servicio está funcionando correctamente.');
});


app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
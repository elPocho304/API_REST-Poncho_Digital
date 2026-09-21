import express from 'express';

const app = express();
const PORT = 3000;

app.get('/info', (req, res) => {
  res.send('Bienvenido a la API de Poncho Digital. El servicio está funcionando correctamente.');
});


app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
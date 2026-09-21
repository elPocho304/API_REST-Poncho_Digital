export const noEncontrado = (arrayDeDatos) => {
  return (req, res, next) => {
    const id = Number(req.params.id);

    const indice = arrayDeDatos.findIndex((e) => e.id === id);

    if (!indice) {
      return res.status(404).json({ error: `El id:${id} no existe.` });
    }
    req.elementoEncontrado = arrayDeDatos[indice];

    req.elementoIndice = indice;
    next();
  };
};
import { stands } from "../data/stands.js";

export const obtenerTodosLosStads = (req, res) => {
    const { nombre, descripcion, pabellon, sector, estado, latitud, longitud } = req.query;

    let resultado = stands;
    if(nombre){
        resultado = resultado.filter(stand => stand.nombre.toLowerCase().includes(nombre.toLowerCase()));
    };
    if(descripcion){
        resultado = resultado.filter(stand => stand.descripcion.toLowerCase().includes(descripcion.toLowerCase()));
    };
    if(pabellon){
        resultado = resultado.filter(stand => stand.pabellon.toLowerCase().includes(pabellon.toLowerCase()));
    };
    if(sector){
        resultado = resultado.filter(stand => stand.sector.toLowerCase().includes(sector.toLowerCase()));
    };
    if(estado){
        resultado = resultado.filter(stand => stand.estado.toLowerCase().includes(estado.toLowerCase()));
    };
    if(latitud){
        resultado = resultado.filter(stand => stand.latitud === Number(latitud));
    };
    if(longitud){
        resultado = resultado.filter(stand => stand.longitud === Number(longitud));
    };

    res.status(200).json(resultado);

}
export const obtenerStandPorId = (req, res) => {
    res.status(200).json(req.elementoEncontrado);
}
export const agregarStand = (req, res, next) => {
    const { nombre, descripcion, pabellon, sector, estado, latitud, longitud } = req.body;
    const nuevoId = stands.length + 1;

    if(!nombre || !pabellon || !sector || !estado || !latitud || !longitud ){
         return next(new BadRequest('Faltan datos obligatorios'))
    };

    const nuevoStand = {
        id: nuevoId,
        nombre: nombre,
        descripcion: descripcion || null,
        pabellon: pabellon,
        sector: sector,
        estado: estado,
        latitud: latitud,
        longitud: longitud
    };

    productos.push(nuevoStand);
    res.status(201).json(nuevoStand)
}
export const actualizarStand = (req, res, next) => {
  const { nombre, descripcion, pabellon, sector, estado, latitud, longitud } = req.body;

  if (!nombre || !descripcion || !pabellon || !sector || !estado || !latitud || !longitud) {
    return next(new BadRequest('Faltan datos obligatorios'))
  }

  const stand = req.elementoEncontrado;

  //reasigno los valores
  stand.nombre = nombre;
  stand.descripcion = descripcion;
  stand.pabellon = pabellon;
  stand.sector = sector;
  stand.estado = estado;
  stand.latitud = latitud;
  stand.longitud = longitud;

  res.status(200).json(stand);
};
export const eliminarStand = (req, res) => {
  const posicion = req.elementoIndice;

  stands.splice(posicion, 1);

  res.status(204).json({ message: "El stand se eliminó correctamente." });
};
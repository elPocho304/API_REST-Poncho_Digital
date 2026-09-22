export const manejadorErrores =(err, req, res, next) => {
const status = err.status || 500
const mensaje = err.message || 'Ha ocurrido un error interno'
return res.status(status).json({error: mensaje})
};
import { z } from "zod";
import {
  actualizarArtesanoSchema,
  consultarArtesanosSchema,
  idArtesanoParamSchema,
} from "../validators/artesanos.schema.js";
import {
  actualizarAsignacionStandSchema,
  consultarAsignacionesStandSchema,
  crearAsignacionStandSchema,
  idAsignacionStandParamSchema,
} from "../validators/asignacionesStand.schema.js";
import {
  inicioSesionShema,
  validarRegistro,
} from "../validators/autenticacion.schema.js";
import {
  actualizarPabellonSchema,
  consultarPabellonesSchema,
  crearPabellonSchema,
  idPabellonParamSchema,
} from "../validators/pabellones.schema.js";
import {
  actualizarProductoSchema,
  consultarProductosSchema,
  crearProductoSchema,
  idProductoParamSchema,
} from "../validators/productos.schema.js";
import {
  actualizarSectorSchema,
  consultarSectoresSchema,
  crearSectorSchema,
  idSectorParamSchema,
} from "../validators/sectores.schema.js";
import {
  consultarSolicitudesRegistroSchema,
  idSolicitudParamSchema,
  resolverSolicitudRegistroSchema,
} from "../validators/solicitudRegistro.schema.js";
import {
  actualizarStandSchema,
  consultarStandsSchema,
  crearStandSchema,
  idStandParamSchema,
} from "../validators/stands.schema.js";
import {
  actualizarEstadoUsuarioSchema,
  crearAdministradorSchema,
  idUsuarioParamSchema,
} from "../validators/usuarios.schema.js";

const convertirSchema = (schema, example) => ({
  ...z.toJSONSchema(schema, {
    target: "openapi-3.0",
    io: "input",
  }),
  ...(example === undefined ? {} : { example }),
});

const uuid = (example = "550e8400-e29b-41d4-a716-446655440000") => ({
  type: "string",
  format: "uuid",
  example,
});

const fecha = { type: "string", format: "date-time" };

// Artesanos: parámetros, filtros, cuerpo y respuestas.

export const ActualizarArtesano = convertirSchema(actualizarArtesanoSchema, {
  nombreEmprendimiento: "NuevoEmprendimiento",
  rubro: "gastronomico",
  localidad: "Poman",
  trayectoria: "Más de diez años de experiencia",
});

export const IdArtesanoParam = convertirSchema(
  idArtesanoParamSchema.shape.id,
);
export const IdArtesanoParamObjeto = convertirSchema(idArtesanoParamSchema, {
  id: "550e8400-e29b-41d4-a716-446655440000",
});

export const consultaArtesano = convertirSchema(consultarArtesanosSchema, {
  nombreEmprendimiento: "Tejidos",
  rubro: "Textil",
  localidad: "Poman",
  ordenPor: "nombreEmprendimiento",
  orden: "asc",
  pagina: 1,
  limite: 10,
});

export const Artesano = {
  type: "object",
  required: [
    "id",
    "usuarioId",
    "solicitudId",
    "nombreEmprendimiento",
    "rubro",
    "localidad",
    "trayectoria",
    "createdAt",
    "updatedAt",
  ],
  properties: {
    id: uuid(),
    usuarioId: uuid("4a4b9b80-5be6-4f34-9bc5-6906a1a1e2bb"),
    solicitudId: { ...uuid(), nullable: true },
    nombreEmprendimiento: { type: "string" },
    rubro: { type: "string" },
    localidad: { type: "string" },
    trayectoria: { type: "string", nullable: true },
    createdAt: fecha,
    updatedAt: fecha,
  },
  example: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    usuarioId: "4a4b9b80-5be6-4f34-9bc5-6906a1a1e2bb",
    solicitudId: null,
    nombreEmprendimiento: "Tejidos del Norte",
    rubro: "Textil",
    localidad: "San Miguel de Tucumán",
    trayectoria: "Más de 10 años de trabajo artesanal",
    createdAt: "2026-01-15T10:30:00.000Z",
    updatedAt: "2026-11-11T20:52:00.000Z",
  },
};

// Respuestas que incluyen relaciones del artesano.
export const ProductoArtesano = {
  type: "object",
  required: [
    "id",
    "artesanoId",
    "nombre",
    "descripcion",
    "precio",
    "createdAt",
  ],
  properties: {
    id: uuid("a0b1c2d3-e4f5-4678-9012-3456789abcde"),
    artesanoId: uuid(),
    nombre: { type: "string" },
    descripcion: { type: "string", nullable: true },
    precio: {
      type: "string",
      description: "Precio decimal serializado como cadena.",
      example: "25000.00",
    },
    createdAt: fecha,
  },
  example: {
    id: "a0b1c2d3-e4f5-4678-9012-3456789abcde",
    artesanoId: "550e8400-e29b-41d4-a716-446655440000",
    nombre: "Manta tejida",
    descripcion: "Manta de lana hecha a mano",
    precio: "25000.00",
    createdAt: "2026-10-20T12:00:00.000Z",
  },
};

export const SolicitudRegistroArtesano = {
  type: "object",
  required: [
    "id",
    "estado",
    "usuarioId",
    "nombreEmprendimiento",
    "rubro",
    "localidad",
    "descripcion",
    "comentarioAdmin",
    "fechaSolicitud",
    "fechaResolucion",
    "resueltaPorId",
  ],
  properties: {
    id: uuid("8a6fca14-5c0f-48e1-a35e-0b68a024f345"),
    estado: {
      type: "string",
      enum: [
        "PENDIENTE",
        "APROBADA",
        "RECHAZADA",
        "MODIFICACION_SOLICITADA",
      ],
    },
    usuarioId: uuid("4a4b9b80-5be6-4f34-9bc5-6906a1a1e2bb"),
    nombreEmprendimiento: { type: "string" },
    rubro: { type: "string" },
    localidad: { type: "string" },
    descripcion: { type: "string", nullable: true },
    comentarioAdmin: { type: "string", nullable: true },
    fechaSolicitud: fecha,
    fechaResolucion: { ...fecha, nullable: true },
    resueltaPorId: { ...uuid("61e5e07d-704d-4699-8aa2-b29d1f460825"), nullable: true },
  },
  example: {
    id: "8a6fca14-5c0f-48e1-a35e-0b68a024f345",
    estado: "APROBADA",
    usuarioId: "4a4b9b80-5be6-4f34-9bc5-6906a1a1e2bb",
    nombreEmprendimiento: "Tejidos del Norte",
    rubro: "Textil",
    localidad: "San Miguel de Tucumán",
    descripcion: "Tejidos y productos textiles artesanales",
    comentarioAdmin: null,
    fechaSolicitud: "2026-01-10T09:00:00.000Z",
    fechaResolucion: "2026-01-15T10:00:00.000Z",
    resueltaPorId: "61e5e07d-704d-4699-8aa2-b29d1f460825",
  },
};

export const ArtesanoConProductos = {
  ...Artesano,
  required: [...Artesano.required, "productos"],
  properties: {
    ...Artesano.properties,
    productos: { type: "array", items: ProductoArtesano },
  },
  example: { ...Artesano.example, productos: [ProductoArtesano.example] },
};

export const ArtesanoConProductosYSolicitud = {
  ...ArtesanoConProductos,
  required: [...ArtesanoConProductos.required, "solicitud"],
  properties: {
    ...ArtesanoConProductos.properties,
    solicitud: { ...SolicitudRegistroArtesano, nullable: true },
  },
  example: {
    ...ArtesanoConProductos.example,
    solicitud: SolicitudRegistroArtesano.example,
  },
};

export const ListadoArtesanos = {
  type: "array",
  items: ArtesanoConProductos,
  example: [ArtesanoConProductos.example],
};

export const PerfilArtesano = {
  type: "object",
  required: ["usuario"],
  properties: { usuario: ArtesanoConProductosYSolicitud },
  example: { usuario: ArtesanoConProductosYSolicitud.example },
};

export const EliminacionArtesano = {
  type: "object",
  required: ["mensaje"],
  properties: { mensaje: { type: "string" } },
  example: { mensaje: "Perfil de artesano eliminado correctamente" },
};

// Autenticación: registro e inicio de sesión.
export const RegistroUsuario = convertirSchema(validarRegistro, {
  email: "artesano@example.com",
  password: "ClaveSegura123",
  nombreEmprendimiento: "Tejidos del Norte",
  rubro: "Textil",
  localidad: "San Miguel de Tucumán",
  descripcion: "Productos textiles hechos a mano",
});

export const InicioSesion = convertirSchema(inicioSesionShema, {
  email: "artesano@example.com",
  password: "ClaveSegura123",
});

export const UsuarioAutenticacion = {
  type: "object",
  required: ["id", "email", "rol"],
  properties: {
    id: uuid(),
    email: { type: "string", format: "email" },
    rol: {
      type: "string",
      enum: ["ADMINISTRADOR", "ARTESANO"],
      nullable: true,
    },
  },
  example: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "artesano@example.com",
    rol: "ARTESANO",
  },
};

export const RegistroUsuarioRespuesta = {
  type: "object",
  required: ["id", "email", "rol", "nombreEmprendimiento"],
  properties: {
    id: uuid(),
    email: { type: "string", format: "email" },
    rol: {
      type: "string",
      enum: ["ADMINISTRADOR", "ARTESANO"],
      nullable: true,
    },
    nombreEmprendimiento: { type: "string" },
  },
  example: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "artesano@example.com",
    rol: null,
    nombreEmprendimiento: "Tejidos del Norte",
  },
};

export const InicioSesionRespuesta = {
  type: "object",
  required: ["mensaje", "token", "usuario"],
  properties: {
    mensaje: { type: "string" },
    token: { type: "string", description: "JWT de acceso." },
    usuario: UsuarioAutenticacion,
  },
  example: {
    mensaje: "Inicio de sesión exitoso.",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    usuario: UsuarioAutenticacion.example,
  },
};

// Usuarios: validadores y respuesta de administración.
export const NuevoAdministrador = convertirSchema(crearAdministradorSchema, {
  email: "admin@example.com",
  password: "ClaveSegura123",
});

export const ActualizarEstadoUsuario = convertirSchema(
  actualizarEstadoUsuarioSchema,
  { activo: false },
);

export const IdUsuarioParam = convertirSchema(
  idUsuarioParamSchema.shape.id,
);
export const IdUsuarioParamObjeto = convertirSchema(idUsuarioParamSchema, {
  id: "550e8400-e29b-41d4-a716-446655440000",
});

export const UsuarioAdministracion = {
  type: "object",
  required: ["id", "email", "rol", "activo", "createdAt"],
  properties: {
    id: uuid(),
    email: { type: "string", format: "email" },
    rol: { type: "string", enum: ["ADMINISTRADOR", "ARTESANO"] },
    activo: { type: "boolean" },
    createdAt: fecha,
  },
  example: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "admin@example.com",
    rol: "ADMINISTRADOR",
    activo: true,
    createdAt: "2026-11-11T20:52:00.000Z",
  },
};

// Productos: validadores y respuestas con o sin el artesano relacionado.
export const CrearProducto = convertirSchema(crearProductoSchema, {
  nombre: "Collar artesanal",
  descripcion: "Collar realizado en plata",
  precio: 25000,
});

export const ActualizarProducto = convertirSchema(actualizarProductoSchema, {
  nombre: "Collar actualizado",
  precio: 27500,
});

export const ConsultaProductos = convertirSchema(consultarProductosSchema, {
  artesanoId: "550e8400-e29b-41d4-a716-446655440000",
  nombre: "Collar",
  precioMin: 1000,
  precioMax: 50000,
  ordenPor: "nombre",
  orden: "asc",
  pagina: 1,
  limite: 10,
});

export const IdProductoParam = convertirSchema(
  idProductoParamSchema.shape.id,
);
export const IdProductoParamObjeto = convertirSchema(idProductoParamSchema, {
  id: "a0b1c2d3-e4f5-4678-9012-3456789abcde",
});

export const Producto = {
  ...ProductoArtesano,
  example: ProductoArtesano.example,
};

export const ArtesanoResumen = {
  type: "object",
  required: ["id", "nombreEmprendimiento", "rubro"],
  properties: {
    id: uuid(),
    nombreEmprendimiento: { type: "string" },
    rubro: { type: "string" },
  },
  example: {
    id: Artesano.example.id,
    nombreEmprendimiento: Artesano.example.nombreEmprendimiento,
    rubro: Artesano.example.rubro,
  },
};

export const ProductoConArtesano = {
  ...Producto,
  required: [...Producto.required, "artesano"],
  properties: {
    ...Producto.properties,
    artesano: ArtesanoResumen,
  },
  example: { ...Producto.example, artesano: ArtesanoResumen.example },
};

export const ListadoProductos = {
  type: "array",
  items: ProductoConArtesano,
  example: [ProductoConArtesano.example],
};

export const EliminacionProducto = {
  type: "object",
  required: ["mensaje"],
  properties: { mensaje: { type: "string" } },
  example: { mensaje: "Producto eliminado correctamente" },
};

// Pabellones: validadores y respuestas con sectores.
export const CrearPabellon = convertirSchema(crearPabellonSchema, {
  nombre: "Pabellón Norte",
  descripcion: "Artesanías regionales",
});

export const ActualizarPabellon = convertirSchema(actualizarPabellonSchema, {
  nombre: "Pabellón Norte actualizado",
});

export const ConsultaPabellones = convertirSchema(consultarPabellonesSchema, {
  nombre: "Norte",
  pagina: 1,
  limite: 10,
});

export const IdPabellonParam = convertirSchema(
  idPabellonParamSchema.shape.id,
);
export const IdPabellonParamObjeto = convertirSchema(idPabellonParamSchema, {
  id: "718d4a3c-3a2a-4b6c-a719-f38db11d7a11",
});

export const Pabellon = {
  type: "object",
  required: ["id", "nombre", "descripcion"],
  properties: {
    id: uuid("718d4a3c-3a2a-4b6c-a719-f38db11d7a11"),
    nombre: { type: "string" },
    descripcion: { type: "string", nullable: true },
  },
  example: {
    id: "718d4a3c-3a2a-4b6c-a719-f38db11d7a11",
    nombre: "Pabellón Norte",
    descripcion: "Artesanías regionales",
  },
};

export const ListadoPabellones = {
  type: "array",
  items: Pabellon,
  example: [Pabellon.example],
};

// Sectores: validadores y respuestas con pabellón y stands.
export const CrearSector = convertirSchema(crearSectorSchema, {
  nombre: "Sector Textil",
  pabellonId: Pabellon.example.id,
});

export const ActualizarSector = convertirSchema(actualizarSectorSchema, {
  nombre: "Sector Textil actualizado",
});

export const ConsultaSectores = convertirSchema(consultarSectoresSchema, {
  pabellonId: Pabellon.example.id,
  nombre: "Textil",
  pagina: 1,
  limite: 10,
});

export const IdSectorParam = convertirSchema(idSectorParamSchema.shape.id);
export const IdSectorParamObjeto = convertirSchema(idSectorParamSchema, {
  id: "c934c45a-11e7-48d3-8600-923330cb282a",
});

export const Sector = {
  type: "object",
  required: ["id", "nombre", "pabellonId"],
  properties: {
    id: uuid("c934c45a-11e7-48d3-8600-923330cb282a"),
    nombre: { type: "string" },
    pabellonId: { ...uuid(Pabellon.example.id) },
  },
  example: {
    id: "c934c45a-11e7-48d3-8600-923330cb282a",
    nombre: "Sector Textil",
    pabellonId: Pabellon.example.id,
  },
};

export const SectorConPabellon = {
  ...Sector,
  required: [...Sector.required, "pabellon"],
  properties: { ...Sector.properties, pabellon: Pabellon },
  example: { ...Sector.example, pabellon: Pabellon.example },
};

export const ListadoSectores = {
  type: "array",
  items: SectorConPabellon,
  example: [SectorConPabellon.example],
};

export const PabellonConSectores = {
  ...Pabellon,
  required: [...Pabellon.required, "sectores"],
  properties: {
    ...Pabellon.properties,
    sectores: { type: "array", items: Sector },
  },
  example: { ...Pabellon.example, sectores: [Sector.example] },
};

// Stands: validadores y respuestas con el sector o sus asignaciones.
export const CrearStand = convertirSchema(crearStandSchema, {
  numero: "A-01",
  sectorId: Sector.example.id,
});

export const ActualizarStand = convertirSchema(actualizarStandSchema, {
  numero: "A-02",
});

export const ConsultaStands = convertirSchema(consultarStandsSchema, {
  sectorId: Sector.example.id,
  estado: "DISPONIBLE",
  numero: "A-",
  ordenPor: "numero",
  orden: "asc",
  pagina: 1,
  limite: 10,
});

export const IdStandParam = convertirSchema(idStandParamSchema.shape.id);
export const IdStandParamObjeto = convertirSchema(idStandParamSchema, {
  id: "7b2c5bd4-0105-4e31-b3bc-40a34e813f17",
});

export const Stand = {
  type: "object",
  required: ["id", "numero", "sectorId", "estado"],
  properties: {
    id: uuid("7b2c5bd4-0105-4e31-b3bc-40a34e813f17"),
    numero: { type: "string" },
    sectorId: { ...uuid(Sector.example.id) },
    estado: {
      type: "string",
      enum: ["DISPONIBLE", "OCUPADO", "MANTENIMIENTO"],
    },
  },
  example: {
    id: "7b2c5bd4-0105-4e31-b3bc-40a34e813f17",
    numero: "A-01",
    sectorId: Sector.example.id,
    estado: "DISPONIBLE",
  },
};

export const SectorConPabellonYStands = {
  ...SectorConPabellon,
  required: [...SectorConPabellon.required, "stands"],
  properties: {
    ...SectorConPabellon.properties,
    stands: { type: "array", items: Stand },
  },
  example: { ...SectorConPabellon.example, stands: [] },
};

export const StandConSector = {
  ...Stand,
  required: [...Stand.required, "sector"],
  properties: { ...Stand.properties, sector: Sector },
  example: { ...Stand.example, sector: Sector.example },
};

export const AsignacionStand = {
  type: "object",
  required: ["id", "artesanoId", "standId", "fechaInicio", "fechaFin", "activo"],
  properties: {
    id: uuid("d851fc85-2ae9-4bf1-9e62-38f1b1b8c5a6"),
    artesanoId: { ...uuid() },
    standId: { ...uuid(Stand.example.id) },
    fechaInicio: fecha,
    fechaFin: { ...fecha, nullable: true },
    activo: { type: "boolean" },
  },
  example: {
    id: "d851fc85-2ae9-4bf1-9e62-38f1b1b8c5a6",
    artesanoId: Artesano.example.id,
    standId: Stand.example.id,
    fechaInicio: "2026-11-01T10:00:00.000Z",
    fechaFin: null,
    activo: true,
  },
};

export const StandConAsignaciones = {
  ...StandConSector,
  required: [...StandConSector.required, "asignaciones"],
  properties: {
    ...StandConSector.properties,
    asignaciones: { type: "array", items: AsignacionStand },
  },
  example: {
    ...StandConSector.example,
    asignaciones: [AsignacionStand.example],
  },
};

export const ListadoStands = {
  type: "array",
  items: StandConSector,
  example: [StandConSector.example],
};

// Asignaciones de stand: datos de entrada y respuestas con relaciones.
export const CrearAsignacionStand = convertirSchema(
  crearAsignacionStandSchema,
  { artesanoId: Artesano.example.id, standId: Stand.example.id },
);

export const ActualizarAsignacionStand = convertirSchema(
  actualizarAsignacionStandSchema,
  { activo: false },
);

export const ConsultaAsignacionesStand = convertirSchema(
  consultarAsignacionesStandSchema,
  {
    artesanoId: Artesano.example.id,
    standId: Stand.example.id,
    activo: "true",
    ordenPor: "fechaInicio",
    orden: "desc",
    pagina: 1,
    limite: 10,
  },
);

export const IdAsignacionStandParam = convertirSchema(
  idAsignacionStandParamSchema.shape.id,
);
export const IdAsignacionStandParamObjeto = convertirSchema(
  idAsignacionStandParamSchema,
  { id: AsignacionStand.example.id },
);

export const ArtesanoAsignacionResumen = {
  type: "object",
  required: ["id", "nombreEmprendimiento", "rubro", "localidad"],
  properties: {
    id: uuid(),
    nombreEmprendimiento: { type: "string" },
    rubro: { type: "string" },
    localidad: { type: "string" },
  },
  example: {
    id: Artesano.example.id,
    nombreEmprendimiento: Artesano.example.nombreEmprendimiento,
    rubro: Artesano.example.rubro,
    localidad: Artesano.example.localidad,
  },
};

export const StandAsignacionDetalle = {
  ...Stand,
  properties: {
    ...Stand.properties,
    sector: {
      ...Sector,
      properties: {
        ...Sector.properties,
        pabellon: Pabellon,
      },
      example: {
        ...Sector.example,
        pabellon: Pabellon.example,
      },
    },
  },
  required: [...Stand.required, "sector"],
  example: {
    ...Stand.example,
    sector: {
      ...Sector.example,
      pabellon: Pabellon.example,
    },
  },
};

export const AsignacionStandConRelaciones = {
  ...AsignacionStand,
  required: [...AsignacionStand.required, "artesano", "stand"],
  properties: {
    ...AsignacionStand.properties,
    artesano: ArtesanoAsignacionResumen,
    stand: StandAsignacionDetalle,
  },
  example: {
    ...AsignacionStand.example,
    artesano: ArtesanoAsignacionResumen.example,
    stand: StandAsignacionDetalle.example,
  },
};

export const ListadoAsignacionesStand = {
  type: "array",
  items: AsignacionStandConRelaciones,
  example: [AsignacionStandConRelaciones.example],
};

export const EliminacionAsignacionStand = {
  type: "object",
  required: ["mensaje"],
  properties: { mensaje: { type: "string" } },
  example: { mensaje: "Asignación de stand eliminada correctamente" },
};

// Solicitudes de registro: filtros, resolución y respuestas relacionadas.
export const ConsultaSolicitudesRegistro = convertirSchema(
  consultarSolicitudesRegistroSchema,
  {
    estado: "PENDIENTE",
    usuarioId: UsuarioAutenticacion.example.id,
    resueltaPorId: UsuarioAutenticacion.example.id,
    nombreEmprendimiento: "Tejidos",
    rubro: "Textil",
    localidad: "Poman",
    ordenPor: "fechaSolicitud",
    orden: "desc",
    pagina: 1,
    limite: 10,
  },
);

export const IdSolicitudParam = convertirSchema(
  idSolicitudParamSchema.shape.id,
);
export const IdSolicitudParamObjeto = convertirSchema(idSolicitudParamSchema, {
  id: SolicitudRegistroArtesano.example.id,
});

export const ResolverSolicitudRegistro = convertirSchema(
  resolverSolicitudRegistroSchema,
  { estado: "APROBADA", comentarioAdmin: "Solicitud aprobada" },
);

export const UsuarioSolicitudResumen = {
  type: "object",
  required: ["id", "email", "rol"],
  properties: {
    id: uuid(),
    email: { type: "string", format: "email" },
    rol: {
      type: "string",
      enum: ["ADMINISTRADOR", "ARTESANO"],
      nullable: true,
    },
  },
  example: UsuarioAutenticacion.example,
};

export const SolicitudRegistroConUsuarios = {
  ...SolicitudRegistroArtesano,
  required: [...SolicitudRegistroArtesano.required, "usuario", "resueltaPor"],
  properties: {
    ...SolicitudRegistroArtesano.properties,
    usuario: UsuarioSolicitudResumen,
    resueltaPor: { ...UsuarioSolicitudResumen, nullable: true },
  },
  example: {
    ...SolicitudRegistroArtesano.example,
    usuario: UsuarioSolicitudResumen.example,
    resueltaPor: UsuarioSolicitudResumen.example,
  },
};

export const ListadoSolicitudesRegistro = {
  type: "array",
  items: SolicitudRegistroConUsuarios,
  example: [SolicitudRegistroConUsuarios.example],
};

export const EliminacionSolicitudRegistro = {
  type: "object",
  required: ["mensaje"],
  properties: { mensaje: { type: "string" } },
  example: { mensaje: "Solicitud de registro eliminada correctamente" },
};

// Errores compartidos por las rutas.
export const ErrorApi = {
  type: "object",
  required: ["error"],
  properties: { error: { type: "string" } },
};

export const MensajeApi = {
  type: "object",
  required: ["mensaje"],
  properties: { mensaje: { type: "string" } },
};

export const ErrorSolicitudApi = {
  oneOf: [
    { $ref: "#/components/schemas/ErrorApi" },
    { $ref: "#/components/schemas/MensajeApi" },
  ],
};

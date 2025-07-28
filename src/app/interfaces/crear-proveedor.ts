export interface CrearProveedorRequest {
  nombre: string;
  empresa?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
}

export interface CrearProveedorResponse {
  mensaje: string;
  id: number;
}
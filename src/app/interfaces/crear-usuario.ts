export interface CrearUsuarioRequest {
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

export interface CrearUsuarioResponse {
  mensaje: string;
  email: string;
}
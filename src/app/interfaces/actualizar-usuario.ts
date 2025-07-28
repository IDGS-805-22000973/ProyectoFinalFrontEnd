// interfaces/actualizar-usuario.ts
export interface ActualizarUsuarioRequest {
  id: string;
  nombre: string;
  email: string;
}

export interface ActualizarUsuarioResponse {
  mensaje: string;
}


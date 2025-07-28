// interfaces/actualizar-rol.ts
export interface ActualizarRolRequest {
  userId: string;
  nuevoRol: string;
}

export interface ActualizarRolResponse {
  mensaje: string;
}
export interface UsuarioDto {
  id: string;
  nombre: string;
  email: string;
  roles: string[];
}

export interface ActualizarNombreDto {
  nombre: string;
}

export interface ActualizarEmailDto {
  nuevoEmail: string;
}

export interface CambiarPasswordDto {
  passwordActual: string;
  nuevoPassword: string;
}
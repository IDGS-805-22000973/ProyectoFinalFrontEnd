export interface LoginResponse {
  token: string;
  expiracion: string; // se puede usar string si viene como ISO date
  nombreUsuario: string;
  rol: string;
  mensaje: string;
}

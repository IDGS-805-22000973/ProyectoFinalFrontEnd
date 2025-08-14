// interfaces/venta.ts
export interface CrearVentaAdminDto {
  productoId: number;
  cantidad: number;
  clienteId: string;
}

export interface VentaAdminDto {
  id: number;
  fechaVenta: Date;
  cantidad: number;
  precioUnitario: number;
  total: number;
  estado: string;
  producto: ProductoDto;
  cliente?: UsuarioDto;
  creadoPor?: string;
}

export interface ProductoDto {
  id: number;
  nombre: string;
  descripcion: string;
  precioVenta: number;
}

export interface UsuarioDto {
  id: string;
  nombre: string;
  email: string;
}
export interface CrearProductoDto {
  nombre: string;
  descripcion: string;
  precioVenta: number;
  componentes: ComponenteDto[];
}

export interface ComponenteDto {
  materiaPrimaId: number;
  cantidad: number;
}

export interface ActualizarProductoDto {
  nombre?: string;
  descripcion?: string;
  precioVenta: number;
  componentes: ComponenteDto[];
}

export interface ActualizarPrecioDto {
  precioVenta: number;
}
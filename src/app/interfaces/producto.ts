export interface ProductoResponse {
  id: number;
  nombre: string;
  descripcion: string;
  precioVenta: number;
  componentes: ComponenteResponse[];
}

export interface ComponenteResponse {
  materiaPrimaId: number;
  nombreMateriaPrima: string;
  cantidad: number;
}

export interface CrearProductoDto {
  nombre: string;
  descripcion: string;
  componentes: ComponenteDto[];
}

export interface ComponenteDto {
  materiaPrimaId: number;
  cantidad: number;
}
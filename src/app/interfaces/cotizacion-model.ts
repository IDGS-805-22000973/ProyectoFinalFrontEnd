export interface CrearCotizacionDto {
  nombreCompleto: string;
  email: string;
  telefono: string;
  empresa?: string;
  productos: ItemCotizacionDto[];
}

export interface ItemCotizacionDto {
  productoId: number;
  cantidad: number;
}

export interface CotizacionResponse {
  id: number;
  nombreCompleto: string;
  email: string;
  telefono: string;
  empresa?: string;
  fechaCreacion: string;
  total: number;
  productos: ProductoCotizacionResponse[];
}

export interface ProductoCotizacionResponse {
  productoId: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
export interface CrearCompraDto {
  proveedorId: number;
  detalles: DetalleCompraDto[];
}

export interface DetalleCompraDto {
  materiaPrimaId: number;
  cantidad: number;
  costoUnitario: number;
}
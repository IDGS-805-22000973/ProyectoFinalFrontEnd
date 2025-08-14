// venta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VentaAdminDto, CrearVentaAdminDto, ProductoDto, UsuarioDto } from '../interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = `${environment.apiUrl}Ventas`;

  constructor(private http: HttpClient) { }

  getVentas(): Observable<VentaAdminDto[]> {
    return this.http.get<VentaAdminDto[]>(this.apiUrl);
  }

  getVentasPorCliente(clienteId: string): Observable<VentaAdminDto[]> {
    return this.http.get<VentaAdminDto[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  crearVenta(venta: CrearVentaAdminDto): Observable<any> {
    return this.http.post(this.apiUrl, venta);
  }

  getProductos(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(`${environment.apiUrl}Productos`);
  }

  getClientes(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(`${environment.apiUrl}Usuarios/clientes`);
  }
}
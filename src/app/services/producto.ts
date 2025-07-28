import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductoResponse } from '../interfaces/producto';
import { CrearProductoDto } from '../interfaces/crear-producto-dto';
import { ActualizarProductoDto } from '../interfaces/crear-producto-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}Productos`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<ProductoResponse[]> {
    return this.http.get<ProductoResponse[]>(this.apiUrl);
  }

  crearProducto(producto: CrearProductoDto): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  actualizarProducto(id: number, producto: ActualizarProductoDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }

  getProductoById(id: number): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(`${this.apiUrl}/${id}`);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
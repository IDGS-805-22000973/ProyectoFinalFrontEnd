import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProveedorResponse } from '../interfaces/proveedor-response';
import { CrearProveedorRequest, CrearProveedorResponse } from '../interfaces/crear-proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = `${environment.apiUrl}proveedores`;

  constructor(private http: HttpClient) { }

  getAllProveedores(): Observable<ProveedorResponse[]> {
    return this.http.get<ProveedorResponse[]>(this.apiUrl);
  }

  crearProveedor(proveedor: CrearProveedorRequest): Observable<CrearProveedorResponse> {
    return this.http.post<CrearProveedorResponse>(this.apiUrl, proveedor);
  }

  actualizarProveedor(id: number, proveedor: CrearProveedorRequest): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${this.apiUrl}/${id}`, proveedor);
  }

  eliminarProveedor(id: number): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/${id}`);
  }
}